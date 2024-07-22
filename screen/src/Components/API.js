
const token = "eyJraWQiOiIvcHJpdmF0ZUtleS5wZW0iLCJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJodHRwczovL3RydXN0d29ya3MuZGsiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJkYXZpZC52aW5qZSIsImlhdCI6MTcyMTYzMjE4MCwiZXhwIjoxNzIxNjY4MTgwLCJncm91cHMiOlsiVVNFUiJdLCJqdGkiOiIyMmZlMzIzZi1jN2E4LTQ1YzItYTY2OS1lYzYwYWRmNmExYTYifQ.VnnAUEwxC5Qm29WxHTRni6FM-cZQ1n6WGUoIsf39EaAacGlfbuW65z7xGB1TC2Mou03YoJbVTXJeWUNTZ_TjSs449D4748puuVqVQ_hHsnoI8jRz6sdrMhU6_46ytHBEuA7VgT7LhCIDUi7hVPFkZudWkMvael0zLTcibFQX3IaEABOyWOKycX3Ml4SBlRWhTPuHRxha7m2_0PjsglSeH_8xOuhh6JdvTJSH7JpqJSVYMMrsSt_b1FtaWuPc5zqAV1QEpk4FeKEHSPR5Qx9dFwSfrEfR7uUZsVA0w2Wgpv2TMm3EjBqtXQ4LREjZkQ3MZdacF8DgvZCVqWU1o-o8T3gUhJ5a4jbSLjc7zPkAvl-2b2Q5tEyjGqHLxvFKb6Ap514eNhKYeVm1zsrOkBZYXQJcGRvPXhc7Rxy4dCHds4yPaTe6YCISN0RQpuQFDOtjK8HONrtQlaoFUn9r776U1_5uwP1j6Tcu7Dv1d-7tJ1ZakSaGj8ZL-UdSOSqVMBuDr5EE53NnT5h6MGDiwMCJtxgm2QKVnsyViSeDkQnhXP8kXNoJSmVyQOaDVCgo94Jlj7pkg_wzdMY1g9ZSKMr8AMBV2Rt1E33JijyAZ1Vmf3ajY2mrKAKPzR3piuIYatl1jVPkEEfh90qkdfI9w-JWbczNAW2dSUlf8DrwQ9nf9xk";
export const config = { headers: { Authorization: `Bearer ${token}` } };

//async
export async function getProjects(setProjects) {
  try {
    // const response = await fetch('https://api.trustworks.dk/knowledge/projects', config);

    // if (!response.ok) {
    //   throw new Error(`HTTP error! Status: ${response.status}`);
    // }

    // const data = await response.json();
    

    const data = require('./testJson.json');


    // Sort the projects by the "from" field in descending order

    const sortedProjects = data.sort((a, b) => {
      // Convert the "from" values to Date objects for comparison
      const dateA = new Date(a.from);
      const dateB = new Date(b.from);

      // Compare the dates in reverse order (newest first)
      return dateB - dateA;
    });

    // Set the sorted projects in the state
    setProjects(sortedProjects);
  } catch (error) {
    console.error('Error fetching projects:', error.message);
    throw error;
  }
}

export async function getEmployeePhotoUuid(useruuid) {
  try {
    const response = await fetch(`https://api.trustworks.dk/public/users/${useruuid}/photo`, config);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data.file;
  }
  catch (error) {
    console.error(`Error fetching employee photo for user ${useruuid}:`, error.message);
    throw error;
  }
}

export async function getConsultants(setConsultants) {
  try {
    const response = await fetch('https://api.trustworks.dk/public/users', config);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    // Filter the consultants to include only active consultants
    const activeConsultants = data.filter(consultant =>
      consultant.active && (consultant.type === "CONSULTANT" || consultant.type === "STUDENT")
    );

    // Update the state with the filtered list of active consultants
    setConsultants(data);
    
  } catch (error) {
    console.error(`Error fetching client:`, error.message);
    return null;
  }
}


export function getActiveConsultants(consultants) {
  try {
    const activeConsultants = consultants.filter(consultant =>
      consultant.active && (consultant.type === "CONSULTANT" || consultant.type === "STUDENT")
    );

    return activeConsultants;

  }
  catch (error) {
    console.error(`Error fetching client:`, error.message);
    return null;
  }
}

export async function getClients(setClients) {
  try {
    const response = await fetch('https://api.trustworks.dk/public/clients', config);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    setClients(data);
  }
  catch (error) {
    console.error(`Error fetching client:`, error.message);
    return null;
  }
}


export async function getClientLogoUudid(clientuuid) {
  try {
    const response = await fetch(`https://api.trustworks.dk/public/files/photos/${clientuuid}`, config);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    return data.file;
  }
  catch (error) {
    console.error(`Error fetching client photo for client id ${clientuuid}:`, error.message);
    return null;
  }
}

//Update list of cliets with IDs and logos
export async function updateClientListWithIdPhoto(projects, setClients) {
  try {
    // Using Promise.all to wait for all requests to complete
    await Promise.all(
      projects?.map(async (project) => {
        const response = await fetch(
          `https://api.trustworks.dk/public/files/photos/${project.clientuuid}`,
          config
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        setClients((clients) => [
          ...clients,
          { id: project.clientuuid, file: data.file },
        ]);
      })
    );
  } catch (error) {
    console.error(`Error fetching client photos:`, error.message);
    return null;
  }
}


