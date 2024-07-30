const getToken = async () => {
  const url = `https://api.trustworks.dk/login?password=${process.env.REACT_APP_PASSWORD}&username=${process.env.REACT_APP_USERNAME}`
  const response = await fetch(url)
  const data = await response.json()
  return data.token
}

//export const config = { headers: { Authorization: `Bearer ${await getToken()}` } };

const token = "eyJraWQiOiIvcHJpdmF0ZUtleS5wZW0iLCJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJodHRwczovL3RydXN0d29ya3MuZGsiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJkYXZpZC52aW5qZSIsImlhdCI6MTcyMjQxNTU0MiwiZXhwIjoxNzIyNDUxNTQyLCJncm91cHMiOlsiVVNFUiJdLCJqdGkiOiJkYTE5ZDZjMS0wZmNmLTQ5ZGYtOGI5NS04NGQyZGU4ZTFjYTAifQ.iak5lw0uGQrh3JulWxySYOEDm_BK8DeOxYmaYNC8ipOasGxZCzy648u1EHBF3FyCul0Hg1mRmlSzcYLUwzM26cZ-yAzSMjS8plEntNV1oyd2jXcsfNzIzA7BAaJXnFw59KiuX8rPzHGD9ftcEKyJsh_r94cwA2N9UQdi74DlErzML96dacwF8IBcSLB57tDIm3tgXiBp9ib9c8mfnTiK9q_pYtCnO0H-qEBIC45vrLbtPRAeRPRoUqhHTKUWRKBFdwehjqVHcwge_nCKGsEmKcWa4ZOFPpDzz3KNqjT21z9p6g5aCwnXFW3yG-fUgOYnUcRFeVaOX_rdYs35P9TfpcN2m57PWCRYgs-BqcqnQKBZbYDHDVyupoLMgyXOFuoFaBKQ_odie5m3lT3rxZE-zQfnktBeDVx81h_Z8jXiRH9BZZFtDudn9-Ggk-_LPLeCWY8kgTJxL7uDkdXCVJ1O4e7ICepLwSfm9AjJmRGv_ZFH0Sax-4oVj-Hh1fKfTH2BlellnXR2C8pNJ8WWDS-38FpbPZfqfCY4o5KK_E1qzWuQu1ijJoAhSXCD_h679WdwMt-ItDFy0lkhoVBC6oX40IlRtkV2zX-i68cNaZkdFONuVVpva7GBC9Bhc7U4SeJFYqGy52Ur9f7wG8eFDrVkeBS9ZzBDjfF1ZJbAOFnH6Zo"
export const config = { headers: { Authorization: `Bearer ${token}` } };

export async function getProjects(setProjects) {
  try {
    // const response = await fetch('https://api.trustworks.dk/knowledge/projects', config);
    // if (!response.ok) {
    //   throw new Error(`HTTP error! Status: ${response.status}`);
    // }
    // const data = await response.json();
    const data = require('./testJson.json');

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


