using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class CameraFollowSimple : MonoBehaviour
{
    [SerializeField] float zOffset;
    [SerializeField] Transform target;

    Vector3 newPosition;

    // Start is called before the first frame update
    void Start()
    {
        
    }

    // Update is called once per frame
    void LateUpdate()
    {
        newPosition = target.position;
        newPosition.z += zOffset;

        transform.position = newPosition;
    }
}
