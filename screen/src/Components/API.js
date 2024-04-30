
const token = "eyJraWQiOiIvcHJpdmF0ZUtleS5wZW0iLCJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJodHRwczovL3RydXN0d29ya3MuZGsiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJuaWNvbGUuYWdnZXJuaWVsc2VuIiwiaWF0IjoxNzE0NDg4NTI1LCJleHAiOjE3MTQ1MjQ1MjUsImdyb3VwcyI6WyJVU0VSIl0sImp0aSI6IjE2YzUwY2IwLWM5ZmItNDc4Zi1iOGFmLTc1NTM2ZmM1Njg3NSJ9.DkVC9EYBkV-QgyAXIHMxjEwgy6vKX7j8o1aienJdFgDhRezazgiiEPX2aUrHFGmoPllyw_VR2wsGeWptzAB90VxGUYdu5kjL0UpEyUXu1lD2Kwj6TRCvhy0hU0CGMRyej_0s6z7WT0V7SFFlp2EgHhHnHunpx0g9C9K9Lndj8DQ3ET6le1M7oFsr-l4RMWryteq-Gyf3TsQeVplomKc-xHqjNMFLBTD18ZO4h2Oq7VohH4u8mziPic5OTBbPcbn7kAsO7J0QMahevhvoWnMu6Lzqc4nV_sh7O8UY_sZhUj_D-R6o4sqWh3vGw2li6Pci0V3O8zF240udPs8fPld6qyQNmF9tzh8ADAOajGGhBAIlaV2V49ua2k_LxPvBy-Rv7brsYxzoLn0r26cprbchcFmDXLEDmZ6fS0Oj3scXAkuc2ZwQH5GmuT-8pdFt9UkHSlnyh4_8vrWww3Aii3duPht656ppHvaU81kVzO95OCJ8yByGSMD5gTRYRpYWNs9-BxE3lYvHX0viMM9XZz3-DKnNMMddV8CuzbBdopteeReM_T_h6bBPsWlPFP-IpP9l7MH2NvjpjFa88da1JHSvZXz0dT2dQMFnjPJOCiRL6KwXMt-xAusVEHDN1oMoAzrv8ROluJXZvWEo4N_Z-QN2BfVnhq8mOaNnkBRAzsvR2m8";
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

