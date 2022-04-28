/*
Test for the connection to an API
Able to use the Get method to read data and "Post" to send data
NOTE: Using Put instead of Post. See the links around line 86

Gilberto Echeverria
*/

using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Networking;


// Create classes that correspond to the data that will be sent/received
// via the API

// Allow the class to be extracted from Unity
// https://stackoverflow.com/questions/40633388/show-members-of-a-class-in-unity3d-inspector
[System.Serializable]
public class User
{
    public int id_users;
    public string name;
    public string surname;
}

// Allow the class to be extracted from Unity
[System.Serializable]
public class UserList
{
    public List<User> users;
}

public class APITest : MonoBehaviour
{
    [SerializeField] string url;
    [SerializeField] string getUsersEP;

    // This is where the information from the api will be extracted
    public UserList allUsers;

    // Update is called once per frame
    void Update()
    {
        if (Input.GetKeyDown(KeyCode.Space)) {
            QueryUsers();
        }
        if (Input.GetKeyDown(KeyCode.N)) {
            InsertNewUser();
        }
    }

    // These are the functions that must be called to interact with the API

    public void QueryUsers()
    {
        StartCoroutine(GetUsers());
    }

    public void InsertNewUser()
    {
        StartCoroutine(AddUser());
    }

    // These functions make the connection to the API

    IEnumerator GetUsers()
    {
        using (UnityWebRequest www = UnityWebRequest.Get(url + getUsersEP))
        {
            yield return www.SendWebRequest();

            if (www.result == UnityWebRequest.Result.Success) {
                //Debug.Log("Response: " + www.downloadHandler.text);
                // Compose the response to look like the object we want to extract
                // https://answers.unity.com/questions/1503047/json-must-represent-an-object-type.html
                string jsonString = "{\"users\":" + www.downloadHandler.text + "}";
                allUsers = JsonUtility.FromJson<UserList>(jsonString);
                DisplayUsers();
            } else {
                Debug.Log("Error: " + www.error);
            }
        }
    }

    IEnumerator AddUser()
    {
        /*
        // This should work with an API that does NOT expect JSON
        WWWForm form = new WWWForm();
        form.AddField("name", "newGuy" + Random.Range(1000, 9000).ToString());
        form.AddField("surname", "Tester" + Random.Range(1000, 9000).ToString());
        Debug.Log(form);
        */

        // Create the object to be sent as json
        User testUser = new User();
        testUser.name = "newGuy" + Random.Range(1000, 9000).ToString();
        testUser.surname = "Tester" + Random.Range(1000, 9000).ToString();
        //Debug.Log("USER: " + testUser);
        string jsonData = JsonUtility.ToJson(testUser);
        //Debug.Log("BODY: " + jsonData);

        // Send using the Put method:
        // https://stackoverflow.com/questions/68156230/unitywebrequest-post-not-sending-body
        using (UnityWebRequest www = UnityWebRequest.Put(url + getUsersEP, jsonData))
        {
            //UnityWebRequest www = UnityWebRequest.Post(url + getUsersEP, form);
            // Set the method later, and indicate the encoding is JSON
            www.method = "POST";
            www.SetRequestHeader("Content-Type", "application/json");
            yield return www.SendWebRequest();

            if (www.result == UnityWebRequest.Result.Success) {
                Debug.Log("Response: " + www.downloadHandler.text);
            } else {
                Debug.Log("Error: " + www.error);
            }
        }
    }

    void DisplayUsers()
    {
        TMPro_Test texter = GetComponent<TMPro_Test>();
        texter.LoadNames(allUsers);
    }
}
