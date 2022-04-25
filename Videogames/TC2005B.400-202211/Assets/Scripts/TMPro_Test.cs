/*
Fill a list of TMP fields with the names obtained from an API
To make the ScrollView content adjust to the contents, use this:
https://unitycoder.com/blog/2016/02/23/ui-scroll-view-automatic-content-height/

Gilberto Echeverria
*/

using UnityEngine;
using TMPro;

public class TMPro_Test : MonoBehaviour
{
    //[SerializeField] TextMeshProUGUI field;
    [SerializeField] GameObject textPrefab;
    [SerializeField] Transform contentTransform;

    public void LoadNames(UserList allUsers)
    {
        for (int i=0; i<allUsers.users.Count; i++) {
            // Create new text objects
            GameObject textTMP = Instantiate(textPrefab);
            // Add them to the ScollView content
            textTMP.transform.SetParent(contentTransform);
            // Set the position of each element
            textTMP.GetComponent<RectTransform>().anchoredPosition =
                new Vector2 (0, -50 * i);
            // Extract the text from the argument object
            User us = allUsers.users[i];
            TextMeshProUGUI field = textTMP.GetComponent<TextMeshProUGUI>();
            field.text = "ID: " + us.id_users + " | " + us.name + " " + us.surname;
            //Debug.Log("ID: " + us.id_users + " | " + us.name + " " + us.surname);
        }
    }

}
