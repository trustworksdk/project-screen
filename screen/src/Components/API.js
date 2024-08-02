const getToken = async () => {
  const url = `https://api.trustworks.dk/login?password=${process.env.REACT_APP_PASSWORD}&username=${process.env.REACT_APP_USERNAME}`
  const response = await fetch(url)
  const data = await response.json()
  return data.token
}

export const config = { headers: { Authorization: `Bearer ${await getToken()}` } };

// const token = "eyJraWQiOiIvcHJpdmF0ZUtleS5wZW0iLCJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJodHRwczovL3RydXN0d29ya3MuZGsiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJkYXZpZC52aW5qZSIsImlhdCI6MTcyMTk3NzM2OSwiZXhwIjoxNzIyMDEzMzY5LCJncm91cHMiOlsiVVNFUiJdLCJqdGkiOiI5MmMwNzZhNy1jMTdhLTRlZWItOWIxMC1hNTk2OGNjOWJlOTAifQ.T0-OxRPQr74i1spvpESt8l2r23UB3QOyK_Z2lFoDoDxtCzkNg1Q5CjxgZMBOm1DzK5-Fk9f2sdLPi-8vBx0eJbJn6Y3n0yZpTTGvSHnF7vXHZ9yQkpov8SI8cX5S7Cemq9MPpB0t7cPJ42qOJ-7UfkKUAkFw6GS7dQWcrUggAvwzQY-Ew5F4BAOPYnP-E1HzLg1BrvHbim4h2xL09kr4MV-L1uQfzfLyG80J3b_74QFjr1NSvGaqKaV-HAS7m013IOsxuZG0iFKUyNNzeTEDFKTShxwuA-krw-Ty44cZZmJvMxir3SRcyYYWC7rtgEt5-Aa33-e6FjSWvLfTpPgxOfk0Pos0fetf8FK_RVDfanT2YXAz2IImUWDUeG6HgsD7nWFGdW3fhFez18aMryk4YibSDzrc73vZGLgqDhNu_bL_ECwfJ--2ur9l5BDfp0htXQqP0dy981ii5ZZyfoCjAkoF_4fmMQ7g6ThJ5oxkEX0eus7ayudgV45NUVVIK7tjcx8sVHFMBwmJLLiXyKEbMB83yqIVUwVU2jzveQuMhQT_Jr1pspR64DRsRmJsgdYghGYYkqOYQ6sMHcgJQAd4-UiuU_lQg2_F6DPnWYov7SxDn2017psqw4peawB86V2Z17xwRkdnnf4arEL7RT20keViTv7RF8jIL2J0q81ZzrM"
// export const config = { headers: { Authorization: `Bearer ${token}` } };

export async function getEvents(setEvents) {
  try {
    // const response = await fetch('https://api.trustworks.dk/news/active', config);
    // if (!response.ok) {
    //   throw new Error(`HTTP error! Status: ${response.status}`);
    // }
    // const data = await response.json()
    const data = require('./events.json');
    console.log('events', data)
    setEvents(data)
  } catch (error) {
    console.error('Error fetching events:', error.message);
    throw error;
  }
}

export async function getProjects(setProjects) {
  try {
    // const response = await fetch('https://api.trustworks.dk/knowledge/projects', config);
    // if (!response.ok) {
    //   throw new Error(`HTTP error! Status: ${response.status}`);
    // }
    // const data = await response.json()
    const data = require('./projects.json');

    // const response = await fetch('https://api.trustworks.dk/news', config);
    // const news = await response.json();
    // console.log('news', news)

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


