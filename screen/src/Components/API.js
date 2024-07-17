
const token = "eyJraWQiOiIvcHJpdmF0ZUtleS5wZW0iLCJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJodHRwczovL3RydXN0d29ya3MuZGsiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJuaWNvbGUuYWdnZXJuaWVsc2VuIiwiaWF0IjoxNzIxMTk4NjAwLCJleHAiOjE3MjEyMzQ2MDAsImdyb3VwcyI6WyJVU0VSIl0sImp0aSI6IjM4ZjI0NzI0LWRlNjYtNDc3Zi1hOTc0LTkwMmZjNTU3MDk0ZSJ9.D4-PGaRiylir9H5aaFiVmPoR_2fdi0bzFwl06Sn1gMFP2llid8fJ4P0Sp-UzZVYv9XU3hrZr5rfaIHt2y7aHnqO4fomy_0w9mgquwPgCbnk64OmcHtoaVbEtLj_C9jrHx4Wx0WlzjHjnBmF3f836dKufW3VXwnB72Ntw5pyPGmd0P6dkXZGa6Abz9dJFgYrZM-Jupffcypi-cCcFmw7DErNceFF0DMxAWQPvwtTpxmHpoiq0wTDMD1QDPuT5HZYr9XaQPQzBKVECFRRrJhb2NBr63XW2FB1rXydg1UNaQJleLnGqqp_-87et7ydKxUyZPukPQz-9aR9KnjYuLWvAuoMRUCcvym49RZpogb5ObxdJuyrXc8gffQm4bs2GuaVtUNGFIX4PPLxZBRgkKVnqMqU9OOE-vXv2I5C4c_bnRhJCN8H05BdXgcltLgnRV7NgbtKeD378TxBCwn1E5IWnxbJndkhxZHfNhElYInRHjH39YQdl4N-rtVlTrghZxazdpxCyqjeaiVuekAIyvThSgvP78wCU7-VXQPRok6SVThSAGRMkFtsuai-1DoeloFTQYqN1W_BA14A8mIlYhGIy723zf10eOS8IN_LSqlRgPtGJ-7-7cYBJ3WcVNFYVSMPslclvhF6FhAhMHHm18u3T3UAUBmmYuWjU64CUvioz58U";
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
    console.log(data);


    // Sort the projects by the "from" field in descending order

    const sortedProjects = data.sort((a, b) => {
      // Convert the "from" values to Date objects for comparison
      const dateA = new Date(a.from);
      const dateB = new Date(b.from);

      // Compare the dates in reverse order (newest first)
      return dateB - dateA;
    });

    console.log('sortedProjects', sortedProjects)
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


