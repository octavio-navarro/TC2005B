using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Networking;
using UnityEngine.UI;
using TMPro;

// This class is responsible for connecting to the API and fetching the card data
// It uses UnityWebRequest to make a GET request to the API
public class APIConnection : MonoBehaviour
{
    // The following variables are used to connect to the API
    [SerializeField] string apiURL = "localhost:3000";
    [SerializeField] string cardEndpoint;
    [SerializeField] string cardId;

    // The following variables are used to display the card data, they are referenced in the Unity Editor
    [SerializeField] TMP_Text cardName;
    [SerializeField] TMP_Text cardDescription;
    [SerializeField] TMP_Text cardCost;
    [SerializeField] Image cardImage;

    // This class is used to store the card data
    Card card;

    public void Start()
    {
        // In order to fetch the card data, we need to use a coroutine
        // This is because UnityWebRequest is asynchronous
        StartCoroutine(GetCard());
    }

    IEnumerator GetCard()
    {
        // We create a UnityWebRequest object and make a GET request to the API
        // We use the cardEndpoint and cardId to fetch the card data
        UnityWebRequest www = UnityWebRequest.Get(apiURL + cardEndpoint + cardId);

        yield return www.SendWebRequest();

        // If the request fails, we log the error
        if(www.result != UnityWebRequest.Result.Success)
        {
            Debug.Log($"Request failed: {www.error}");
        }
        else 
        {
            // If the request is successful, we parse the JSON data and store it in the card object
            // The response of the request is stored in the downloadHandler property of the UnityWebRequest object
            string data = www.downloadHandler.text;

            // Using the JsonUtility class, we can parse the JSON data and store it in the card object
            // It is important to note that the JSON data must match the structure of the Card class
            card = JsonUtility.FromJson<Card>(data);

            // Using the card object we can display the card data in the UI
            cardName.text = card.card_name;
            cardDescription.text = card.card_description;
            cardCost.text = card.card_cost.ToString();
            cardImage.sprite = Resources.Load<Sprite>($"Spells/{card.card_id}");
            
            Debug.Log($"Name: {card.card_name} Description: {card.card_description} Cost: {card.card_cost}");
        }
    }
}
