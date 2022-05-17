/*
Script to create new objects in the game and to move them around

Gilberto Echeverria
*/

using UnityEngine;

public class CreateItem : MonoBehaviour
{
    // The camera that will be used during edition
    [SerializeField] Camera editCamera;

    // Positions in different coordinate systems
    Vector3 mousePos;
    Vector3 worldPos;

    // Object to be moved
    GameObject instance;
    bool moving = false;

    // Callback for a button to create a new object on the scene
    public void MakeObject(GameObject item)
    {
        Instantiate(item, Vector3.zero, Quaternion.identity);
    }

    // Update is called once per frame
    void Update()
    {
        // Clicking on an object will select it and activate to drag
        if (Input.GetMouseButtonDown(0)) {
            // Detect mouse position and convert to 3D world coordinates
            mousePos = Input.mousePosition;
            mousePos.z = editCamera.nearClipPlane;
            worldPos = editCamera.ScreenToWorldPoint(mousePos);
            worldPos.z = -10;

            //Debug.DrawRay(worldPos, Vector3.forward * 10, Color.yellow);

            // Detect the object under the mouse pointer
            RaycastHit2D hit = Physics2D.Raycast(worldPos, Vector3.forward);
            if (hit.collider != null)
            {
                Debug.Log(hit.collider.gameObject.name);
                instance = hit.collider.gameObject;
                moving = true;
            }
        }

        // While the button is held down
        if (Input.GetMouseButton(0)) {
            mousePos = Input.mousePosition;
            mousePos.z = editCamera.nearClipPlane;
            worldPos = editCamera.ScreenToWorldPoint(mousePos);
            // Use only integer numbers for the positions
            worldPos.x = Mathf.Round(worldPos.x);
            worldPos.y = Mathf.Round(worldPos.y);
            worldPos.z = 0;
            // Move the new object below the mouse
            instance.transform.position = worldPos;
        }

        // Release the object to stop moving it
        if (Input.GetMouseButtonUp(0)) {
            instance = null;
            moving = false;
        }
    }

}