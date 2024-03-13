
const token = "eyJraWQiOiIvcHJpdmF0ZUtleS5wZW0iLCJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJodHRwczovL3RydXN0d29ya3MuZGsiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJzZWJhc3RpYW4uZnJhbmRzZW4iLCJpYXQiOjE3MTAzNTE3MTUsImV4cCI6MTcxMDM4NzcxNSwiZ3JvdXBzIjpbIlVTRVIiXSwianRpIjoiNWYwYjRhZGMtZmRiYi00NjE1LWI4NzktMGM5YjM1NDcwM2QwIn0.cieRZcX_1xCTocZ_gcbUicdoAk8w0NkqRu_nAMa5Ud2-VRhX5tojhG0BeuMoxBISxWj7rcF-OrmvVp03J2uH_2Thg1NebDOCB2iEddVWW26yVgvkQd93kqaHUjNdgyb24d_4OtpCQ3GQ-36qEpG-h0fJsDy9quAtr3ApDGpRWD1K0rstkk8j78gvkqn9CugPmkHl6P8UhhrqnyaADJBrbC3-hNZpLZziBvrAGH02AI1vE4Rb2t0sccpqrraI0_W2zL2xI6d0_t6uz73NuhTij5mBPvRqAhdxvfQ4KdpieAvD4nPYNqVv7LfbP-BtbkcKlqcKPWAXZu-f6ogIUeeCcB5o_JS-0njlXl1XulUVlhIfBpsPIQyb2d_bZHCy-BLJL8A49hOxBfKY-5g5Qb_yRiu1gVQETbjN6wknXRm0mRP-1qfyEtPhhBTwGL_q4X0SD0wCkcKAxGwJ26Kldr4FdBNYmKAC00wr4rJC23j7m1JVXZIqrRD8mu1YEpAknyUtD6nXg-qqm9WYdyRK_jxBYX35uWp5dngBfRPXCDntppdO5C5IYnu1x5wWtvcTxoDVTfZx_T2cEXGmP3M8T-qP1Xk6WJCiFe6RrVCqs3eQbV05bSQFDCodsr-yKYAMjVRw6WaQ1O-UlSkb4YROMrlbaIjoXyz0yAtfr8DheWPdmYA";
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

