
const token = "eyJraWQiOiIvcHJpdmF0ZUtleS5wZW0iLCJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJodHRwczovL3RydXN0d29ya3MuZGsiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJuaWNvbGUuYWdnZXJuaWVsc2VuIiwiaWF0IjoxNzE0MTIyMjI2LCJleHAiOjE3MTQxNTgyMjYsImdyb3VwcyI6WyJVU0VSIl0sImp0aSI6IjNhM2Q1MjBiLTYwM2ItNDU0Yy04ZTk3LWQ1OGM5NzNjZTBlNSJ9.l7S9opfZjYshhypP4DhaeuHOjUnpAcxxkwfBeFUYVR3UUoGfGaR9qXUiUi7ZFeiHt3A6r6pNfDOQY3AtRs9sAUBp725pYaxJv1YU0M0y-8AbkzCBOhsahKp44Xr-qPaInjx08J8ts0P3B7WZQWlWCS8xin5LkgqCp8jOm3FLxFvFb5b52jstvWatY3W62HwH3KXZmvw10xeFJzzXQEEOduKSZ_ayfV4IgDDl1JtwH3LjHo6KEeNITFFWaiR9IuTG_-_fJnNNqAwnDBbWFDPdPDNFapKkAb56rvW2unQ9U1AdWDPV4au0USotxjD_wpftHutmUlKrdO9TqAXZwBJR2voDlbzSk_7NKuRXv5YrV-2k32e72tL10l-PDePqfSW6wVpatZhyh0wX5pcFCTezmC2YI_2IowBAgh3Rra10LxV0NqkS3Bgzst2cI5wdkYT7l0nuaZg5p46Zdkoy7-sskTpISW_NFhvxck0fVo_RNN0_8HYbaTtsSUIQ4jg6da45f0uuqtqcXEDWyykGAlXwmxvtkTJIKNJgM3X5Rw0h9P9JP9qRzGKCuDzzRir1gT4XyQNprhmjVA7CwE8Hwhr3LoqNseHLGYEpxfHUPkoqBLlLOFuarmhlr4s_CB9QSV6EnyL3gAsHE1GY_BxH9K7yeWdoH5WksZTJu5STo0hUVUo";
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

