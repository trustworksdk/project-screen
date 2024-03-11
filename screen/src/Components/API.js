
const token = "eyJraWQiOiIvcHJpdmF0ZUtleS5wZW0iLCJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJodHRwczovL3RydXN0d29ya3MuZGsiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJuaWNvbGUuYWdnZXJuaWVsc2VuIiwiaWF0IjoxNzEwMTcyMjE2LCJleHAiOjE3MTAyMDgyMTYsImdyb3VwcyI6WyJVU0VSIl0sImp0aSI6IjVkOTZjMjg0LTUwMzctNDE5YS1iNzZiLTY1YTM0ZDg3NWI0MiJ9.MCQgCUKjsRA0Tds_Ao9WMtlJ-KQrxTyeb1cgXsRmZIynTvLNbJCsRZjKX82s6-JwFYRZuV0ksUOBDDK4ZINXXwmgi0uKFYGQqnf_Mp6ackYIUp8B4K5XMTPyYTtxuN7I93aktP8q1sKMEZK29pVmFsy_tdbpcASdgetnSkEhHRBC_C4x9lYeMAh5oxRPetWkTFXZBSVDfbjCbTkioj3kdpfdpaxyYtm8WCtiTT3iP3JTeK_Y8HktGVYODq9Oaq4dKP5rlDsM8oWUF8CLRq2dPTxERBys_IQBzHMZ4jAqG21eSUvuAT5x7VbayAevx3pbis3LgyQunu2TgHvsJ3c27onZK6GJXm4lpW5XbJmodlDMZH1iB0SDansWChmGWHdXtY2Off76tb5ZsLErsw5ep_Rp72Afdwhfk8EL-Tsdmox5QbBOKPguM6-6LBBRCiR-aWQEATHptzEE4rpkGsoxexxryXTzt_hck5bEodM1G5aoB8ZC56K3VgHU0kU6I1Tcbbu0nGSs6JjkNlekPSIpmDMczbAWZFtKUQjyENQxVua1RayzlZGkSUzJRbwo-4W5LQ9X33YQyA32cKBp_-BatEtPdHbi-2_IqwkxTujfjFOaQmHisnvr7Pu8r-QMx5s-7kDzExw-_vyhVe1bW7ZYd12AMXrQhcpPEqcYIkwbbeo";
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

