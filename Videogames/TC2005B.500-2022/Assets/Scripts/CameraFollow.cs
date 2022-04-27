/*
Make the camera follow the position of the main character

Gilberto Echeverria
*/

using UnityEngine;

public class CameraFollow : MonoBehaviour
{
    [SerializeField] Transform target;

    Vector3 offset;

    // Start is called before the first frame update
    void Start()
    {
        // Get the distance between this object and the target
        offset = target.position - transform.position;
    }

    // Update is called once per frame
    void Update()
    {
        // Follow the position of the target
        transform.position = target.position - offset;
    }
}
