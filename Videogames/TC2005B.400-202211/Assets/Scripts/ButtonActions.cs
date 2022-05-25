/*
Callbacks for buttons
Used to test the API interaction from other scripts

Gilberto Echeverria
*/

using UnityEngine;

public class ButtonActions : MonoBehaviour
{
    //[SerializeField] GameObject apiObject;
    //APITest api;

    [SerializeField] APITest api;

    void Start()
    {
        //api = apiObject.GetComponent<APITest>();
    }

    public void GetUsers()
    {
        api.QueryUsers();
    }

    public void AddUser()
    {
        api.InsertNewUser();
    }
}
