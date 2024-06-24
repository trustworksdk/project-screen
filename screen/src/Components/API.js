
const token = "eyJraWQiOiIvcHJpdmF0ZUtleS5wZW0iLCJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJodHRwczovL3RydXN0d29ya3MuZGsiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJuaWNvbGUuYWdnZXJuaWVsc2VuIiwiaWF0IjoxNzE5MjEyOTA0LCJleHAiOjE3MTkyNDg5MDQsImdyb3VwcyI6WyJVU0VSIl0sImp0aSI6ImIxMjM2ZmE1LTI5YzMtNGI1Ni1iNGU2LTVlZTg1NGU0Y2E5YSJ9.fLcWrh_XpmVPH1edbGwok6nY-E5ERBdE7jYiKMhQA9JQJq-5zelkERD7z7LOEYwCSAPDm3ZmzTxeRNJBie7Frr1703ipRcBinPt59ZYtcyGyo4_Jds5XR_Z7jpP3iFL32HM9yV1ZDqOFU6-pIyCVxbFfs4CdvO1c0lQMsHuGjRxoUrULRsIX3bPivU2gCwu1xrDNRIgDEqdpsksMpHh6Q55hNl8pMvMFY424AXeDaWVaNUcdDuCg9AZ1lTuFUrTaKxADnhyCmU38o2gjQBlyzJiApLCZy_OKEIrW51qtnnjaMitzuWmr0lfwl6ycThADew3Ov0D5CI4znAw58GvolGSsIvSBmOXaR6QeJVlsVoajkjBypPgY_i_Pm6gEr7_PBrw3laCn6OAE3tIIWYCwiYmVfp0qnPflHkD1A1TU-1MRQP0SYG1f1b4EUjJ4VbwBpIkxkm8iyJBGQtQYjfAhw_J1xx9P3qWPAbOyDHp5HGVjeQ3wW2sL3SyjyNPMdBsSwW1sAEckCW6_QiLr_KaQGExtvgvApS5g3LRheeY9apI8VBHQsPlcExIzc5zDatU-Z_IbWNXT-kU-Dg4rb9l_-4kYXV_UU6Nvl7q_2xAYeI8XN7xXdjevb8o4MwASenT7MFxjy77oiqcSVDAUNu7AVKonAY-6n3kOeJg3HeMWpTk";
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

    // Filter the consultants to include only active consultants
    const activeConsultants = data.filter(consultant =>
      consultant.active && (consultant.type === "CONSULTANT" || consultant.type === "STUDENT")
    );

    // Update the state with the filtered list of active consultants
    setConsultants(activeConsultants);
    
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


