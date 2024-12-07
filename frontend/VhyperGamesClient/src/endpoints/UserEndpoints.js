// export const UPDATE_PASSWORD = `${API_BASE_URL}User/update-password` Este es el que tienes que importarte desde config.js

export const updatePassword = async (url, password, token) => {


  const response = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(password),
    
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Error al actualizar la contraseña: ${response.status} - ${errorText}`);
  }

  const data = await response.json();
  
  return data;
  
};

export const updateUser = async (url, userData, token) =>{

  const response = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization:  `Bearer ${token}`,
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Error al actualizar los datos de usuario: ${response.status} - ${errorText}`);
  }

};