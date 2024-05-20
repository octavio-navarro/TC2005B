/*
Make requests to an API to get the data for the game

Gilberto Echeverria
2024-05-14
*/

using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Networking;

public class APIConnection : MonoBehaviour
{
    [SerializeField] string url;
    [SerializeField] string getEndpoint;

    SimonController controller;

    // Start is called before the first frame update
    void Start()
    {
        controller = GetComponent<SimonController>();
    }

    public void GetData()
    {
        StartCoroutine(RequestGet(url + getEndpoint));
    }

    IEnumerator RequestGet(string url)
    {
        // Prepare the request object
        using(UnityWebRequest www = UnityWebRequest.Get(url)) {
            // Make the request and wait for it to respond
            yield return www.SendWebRequest();

            // Validate the response
            if(www.result != UnityWebRequest.Result.Success) {
                Debug.Log("Request failed: " + www.error);
            } else {
                string result = www.downloadHandler.text;
                Debug.Log("The response was: " + result);
                // Start the process to create the simon buttons
                controller.apiData = result;
                controller.PrepareButtons();
            }
        }
    }
}
