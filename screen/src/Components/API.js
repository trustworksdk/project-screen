
const token = "eyJraWQiOiIvcHJpdmF0ZUtleS5wZW0iLCJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJodHRwczovL3RydXN0d29ya3MuZGsiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJkYXZpZC52aW5qZSIsImlhdCI6MTcxOTQ4NTk5MCwiZXhwIjoxNzE5NTIxOTkwLCJncm91cHMiOlsiVVNFUiJdLCJqdGkiOiI1ZWNiNzJmNi1mYWJhLTRlN2ItYmYxYS1jM2M5M2Y5MDY5NDYifQ.PHfAno6_l2vgaRcdJoKHS4cyhvlWE4wLXPRcs6o-Vy0OulUt_oA3nW03YreIu3Wc3-s2sClpl7422Q7u8FTZeAP_gwKg9e0cgVnPgwTrrzsZsLK3KzfHmhYW9955-ZE3qkA-r4CiyS_noizbmpYHofEx4Nh1N1M_Bvw6AeUv9UbhF5UW9-u0WlvDzhT9dnITQnwcfPBlSCUujrpUSJYZYXdFmNOzq61ZMkkU8z44aUZDAcH-FvuRgBL2b9YZdM8Z2I47o5vt4SsIo4Usrh3NfuUB6BV3j6jzTXJKtYlYEPB0LSO4NxzmePq7ftK98NNeReO0DgRu3jkF-3vsnMJh-VYvv0wl1roj-hc4dSYgoJeTMbiiz5-M5gzCq3hfLk3Up0ZO0v5YHU5kh1JIULyVBmtEsd_5xh7HhnQQ7Lx7md2fdlZD0c5_C4LBzqZodf2eMPHHNy9_eGlVlaic8pTOCOAYa0Sv8A_iN5LHA4h9-CaydkqOCmAbG17GJaSZXAOfHxpV6qFWd-Q-nJy0sYjDFA_gg9kCR09XrTbjd7s2Vb1TUP98hgxjqB1QTbmPYxhdIuEF5T6CGwA256hefRU_Xy9UXOj5AtSfHS51tR-QlttkQMa2ZatIbWP_HO6qMT58mqHH6BC6O1u0bFE3EpU0Jqu71nNYTkA19abyG6Hu_Bw";
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


