
const token = "eyJraWQiOiIvcHJpdmF0ZUtleS5wZW0iLCJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJodHRwczovL3RydXN0d29ya3MuZGsiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJuaWNvbGUuYWdnZXJuaWVsc2VuIiwiaWF0IjoxNzA3MjM1NjgwLCJleHAiOjE3MDcyNzE2ODAsImdyb3VwcyI6WyJVU0VSIl0sImp0aSI6ImQ0NTZiYzRjLTkzOTQtNGNlMi1hOGNkLTgzZDY4NzY0NWE3OCJ9.lweCu5q-c3ELmOdjEZpebvh6r-pKt8h5E-crN-x63STGZGg6klohO-OWJpW5JqI7JdIqg3wk2QMe3KqwCf5SoRgVK4QeMimzGlbRVEKJpjIndpvSq1khaTry8fLlMZNxp87oUipG5cpME3HIxZmfAgLaE2EkJ4V-DiY4kka4-b4behdrrDJZWmaTWgHkI9T5bENHlW6UNPrgGy1Y95lv37US0tekEpqTWT4otOQbUnQjpZJgCXRxYSWHmFoGVYIHinTLfauNa0b9uvj9bVdNN-tzhVMmFEftd2-feUE0O11XVhfZE2MGeDgM0I1hZYlCs8w-x6WTBr6JITWPzPVhd5ENBQ2J4s5RknWBfWc0ySaqvU7ooCjAp9Dngjrz-ObQ4AC2_QFmjvr_gIcOZDFxxDokdWukgfbaMj8wL9EB6i1Kl07EsigHumd1NSJmk09rWyPJOqLLjpcIqsN78HGzsi8s5nFK3KznClbOWnB1tTwIz9k4M-IK1hgOXpN7xq8YcX06YbabXCEYlEaNVmnLT-XOqvwrwO_X1qoKv5ZvgZCGNBF_-6C0gy6FeyMdpnkt89dWiFp1Tad-LqnrSzw3srTzwou_AbwW0cnZBMF--fqMUE-s8VzpHouurWZSr3GeGYI7GM2xKH_b-1OxZjaPzTks6XH8Jz35Blgrg69CnR0";
export const config = { headers: { Authorization: `Bearer ${token}`} };

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

        if(!response.ok) {
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

        if(!response.ok) {
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

        if(!response.ok) {
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

