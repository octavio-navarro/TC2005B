/*
Script to create new objects in the game and to move them around

Gilberto Echeverria
*/

using UnityEngine;

public class CreateItem : MonoBehaviour
{
    Vector3 mousePos;
    Vector3 worldPos;

    GameObject instance;
    bool moving = false;

    [SerializeField] Camera editCamera;

    public void MakeObject(GameObject item)
    {
        instance = Instantiate(item, Vector3.zero, Quaternion.identity);
        moving = true;
    }

    // Update is called once per frame
    void Update()
    {
        if (Input.GetMouseButtonDown(0)) {
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

        if (Input.GetMouseButtonUp(0)) {
            // Release the object to stop moving it
            instance = null;
            moving = false;
        }
    }


}
