
const token = "eyJraWQiOiIvcHJpdmF0ZUtleS5wZW0iLCJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJodHRwczovL3RydXN0d29ya3MuZGsiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJuaWNvbGUuYWdnZXJuaWVsc2VuIiwiaWF0IjoxNzE0MzcwNTgzLCJleHAiOjE3MTQ0MDY1ODMsImdyb3VwcyI6WyJVU0VSIl0sImp0aSI6ImM1N2QwMDIyLThiMWQtNGJiMy05N2Y4LTdiY2IwZDc5MmZhOCJ9.YA1R4R9YNlHZe0qn9je8EaxW8bx3TrqoBWqpfoUUJAU36aLea2ilExI9t6FBwa-EtxsHYM-U2pHyjkTpIdTAr83EZ_GtMoSJuSUqCE6Or-dVx7Qlj9ZhQ9JXR5APV-6cSGG69aaIci75d7vSVZ-6HWjffl3O0ZsQDonDna0LNGl_Y7a066n6iIqKpu88dWhbibcKiQFDgesewiKviFY1GmhAZ07tRGUJBPatLpW69eVcNUPcbq8MIEDvaf-5xF5LOQ_hiEWgYxGtAj2Gcov6lCRCUXL-sWasQ0XDcPrZKAcsy5bYEe848LKWOjTwuiI96fwuNuBpP44j6TkVVBwJ0VwDgnPLr93atEL_ORB6C3-xX2EYp2q1aoZ75rtYY2ZO_t5ghyHr6ZDGxt_RafD02WdspnpMwTp5wMTWIpztrEaPndJfCtIvJ1XYvdwgRHiJb3oStYK5JV7TSeNl3x-Xa9FPv1Z8n4u9xt9R5KVecqx0WIwTkd82xkwN_YLwS6f3ZG8LKw_n3vRdcZvnvhmg8s4Ll_KgZhUFoLM_zSeWSvnv8dKly1z1pcyVSPJaF8WlYZ5Fi8tUq_c0KDIh9Fe33QRDolIaeAq0tc9vPxo3kwBohBo8LRkvWSleObBJDraboDnTlqNBPSQpcc1UwnfN-w5tQ0HHuelaBaCPl_CJj-Y";
export const config = { headers: { Authorization: `Bearer ${token}` } };

export async function getProjects(setProjects) {
  try {
    const response = await fetch('https://api.trustworks.dk/knowledge/projects', config);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
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

    setConsultants(data);
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



//   //Set list with client IDs and logos
//   useEffect(() => {
//     projects?.map(project => {
//         axios.get(`https://api.trustworks.dk/public/files/photos/${project.clientuuid}`, config)
//         .then(response => {
//             setClientList(clientList => [...clientList, {id: project.clientuuid, file: response.data.file}])  
//         }).catch(error => {
//         console.log(error)
//         })
//     })
// }, [projects]);

