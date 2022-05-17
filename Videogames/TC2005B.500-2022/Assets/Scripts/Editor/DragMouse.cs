/*
Detect the distance and angle of the mouse motion

References for using the mouse:
https://gamedevbeginner.com/how-to-convert-the-mouse-position-to-world-space-in-unity-2d-3d/#screen_to_world_2d

Gilberto Echeverria
2022-0-18
*/

using UnityEngine;

// Make sure the object has this component
[RequireComponent(typeof(LineRenderer))]

public class DragMouse : MonoBehaviour
{
    Vector3 startPos;
    Vector3 endPos;
    Vector3 mousePos;

    LineRenderer lineRenderer;

    // Start is called before the first frame update
    void Start()
    {
        lineRenderer = GetComponent<LineRenderer>();
    }

    // Update is called once per frame
    void Update()
    {
        if (Input.GetMouseButtonDown(0)) {
            mousePos = Input.mousePosition;
            mousePos.z = Camera.main.nearClipPlane;
            startPos = Camera.main.ScreenToWorldPoint(mousePos);
        }

        if (Input.GetMouseButton(0)) {
            mousePos = Input.mousePosition;
            mousePos.z = Camera.main.nearClipPlane;
            endPos = Camera.main.ScreenToWorldPoint(mousePos);
            startPos.z = 0;
            endPos.z = 0;
            lineRenderer.SetPosition(0, startPos);
            lineRenderer.SetPosition(1, endPos);
        }

        if (Input.GetMouseButtonUp(0)) {
            // Built in function seems to give an incorrect result
            //float angle = Vector3.Angle(startPos, endPos);
            // Manual calculations for the angle
            float radians = Mathf.Atan2(endPos.y - startPos.y, endPos.x - startPos.x);
            float angle = Mathf.Rad2Deg * radians;
            float distance = Vector3.Distance(startPos, endPos);
            Debug.Log("Mouse Distance: " + distance + " | Angle: " + angle);
        }
    }

}
