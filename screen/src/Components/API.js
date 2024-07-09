
const token = "eyJraWQiOiIvcHJpdmF0ZUtleS5wZW0iLCJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJodHRwczovL3RydXN0d29ya3MuZGsiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJuaWNvbGUuYWdnZXJuaWVsc2VuIiwiaWF0IjoxNzIwNTA3MTMzLCJleHAiOjE3MjA1NDMxMzMsImdyb3VwcyI6WyJVU0VSIl0sImp0aSI6ImVhZWZiN2JiLWFhOGUtNDcxNi05M2ViLTE0MTlmMzE5MDQzMSJ9.D6Y0mGHn_0vifZp7HoixLlFGu3SuqmwJ93bLQx8w-e-LuwdbYGuyBjNE3xns-l_2yAvYMmeDgSt4-VJoG8TyaUPmBrMAKfnc6pudCXhPt70wBAedA6-3bCblmp3wcsz740sz6mwGHZpF8zeMi57gxXp6W0JqropWm8wOkARQaaxbXuJN7yeL6_kXN97q8fEh8m-zIssJdo4geJETzyc1-ahmUyi0a1s9CU1dXfdUtky-XeCam_-PqQsz4wr1_ZL4esIArVy3YG42wIIumeWomL53FOIWC-HE3MwqmCw125ZC5qysTkgLnhwhKngsCyL6ueuuLYd2scoxYT68Am7SsjxtT-1TIC3XMq5rpQjGubufLrR_BWSiRQd3BAo1S3smyfbqTVqCI95Yzk1XLbgW1EwKDzRvSwPuDQYBTy4VLwVeAIdYCrP_6e5_GvXT7u0Qc9PL5_5r3xOWMkC3o0U3FW8Ox5K9DRA5aksMu0PG9msfb0L-i2YfIajeaFpnvQvTTIKEKNRIVOGKgeMmvIl5nFxPLXxGTx6JNysCmBBrLEwvqxeltGBgJ2xIpHxgNRsKqT_x3tWd6THHKz51TIqA2_-s_l0zobrsiTKa0w0m4umJljppZ-2tnBXBUvVQTzpfnPmlDDMJmeADf0Ib2xIzzZcMfLNb5jpYuTDAw1MuCWk";
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


