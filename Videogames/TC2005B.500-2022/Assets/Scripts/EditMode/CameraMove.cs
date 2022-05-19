/*
Control the movement of the camera with the arrow keys

Gilberto Echeverria
*/

using UnityEngine;

public class CameraMove : MonoBehaviour
{
    [SerializeField] float speed;

    Vector3 pos;
    Vector3 move;

    // Start is called before the first frame update
    void Start()
    {
        pos = transform.position;        
    }

    // Update is called once per frame
    void Update()
    {
        // Reset the movement
        move = Vector3.zero;

        //move.x = Input.GetAxis("Horizontal");
        //move.y = Input.GetAxis("Vertical");
        if (Input.GetKey(KeyCode.K)) {
            move.y = 1;
        }
        if (Input.GetKey(KeyCode.J)) {
            move.y = -1;
        }
        if (Input.GetKey(KeyCode.H)) {
            move.x = -1;
        }
        if (Input.GetKey(KeyCode.L)) {
            move.x = 1;
        }
        
        // Translate the camera
        pos += move * speed * Time.deltaTime;
        transform.position = pos;
    }
}
