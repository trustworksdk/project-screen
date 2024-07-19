
  const token = "eyJraWQiOiIvcHJpdmF0ZUtleS5wZW0iLCJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJodHRwczovL3RydXN0d29ya3MuZGsiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJkYXZpZC52aW5qZSIsImlhdCI6MTcyMTIwMDY4MCwiZXhwIjoxNzIxMjM2NjgwLCJncm91cHMiOlsiVVNFUiJdLCJqdGkiOiI4Mjg3MDVkMS0zNmUwLTRlZjktOWYxNi04NDVlMTc1NTkyNDAifQ.PTTfnRvPf-EGgcs_LNn6h5kAFFFLA_yUqoaWQ1o-YHaNp9vz-5pPNJvYCW8E35MCSvUUR72lXaCCDCZsLOBsBlPdfyGjPPKflHB0Bf_eFc46lMYfcBTtCoOczqlrqXudd3zpeToTbXI9Xxcx-INvX-p6_5cgNVBvcXVvqr7dN__GG5HlY6wQa2ZdYzVJsE0qMRW9GGIyQaPlHfEHyAR5RYwmIooGfvD_m_2d51LDe9nzzNyhmh8oV16X76jR_xlO_rOO75zWqi_36LYhIpI17D_8WGnpA69oxAEqQ48iqCvEsGuz9lj9UOjeQbC5I_takMnZt6QEGOzcgwcUZelru1dsJk-cAqdBh0AZwGGBazJZIt_YALNU_RstOYCN1di4v-EAF9k7sHizR_t-ll1xTcfP5JsxTprWVlRGX7I0Ebl2h8tdKPHTgc9nKfP1eCHJdNzpgg8XqYcaq9YB2vWVg1tPATpFR2pVTRgFTIT2-HzdleWucKKvpvZh85jbHEQvtS6pssCkRhx2SkqZuCshdSoMQxzmob4kByDV0v0CFwjptGc8pY2a5LntjGlMvke6KPay9mMfWiusAYQwPptKIfrNYktXZk11ynE0J2joC2g3UaxAgaCdm0INqcKxmiJWkeIhN8XQQTz-jpgoIx0ObBJCQDf7at0EzeMNUYBr57w";
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


