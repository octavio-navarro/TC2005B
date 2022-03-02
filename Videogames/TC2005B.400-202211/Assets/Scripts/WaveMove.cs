/*
Move an object horizontally in a wave pattern

Gilberto Echeverria
*/

using UnityEngine;

public class WaveMove : MonoBehaviour
{
    // Point around which the object will oscillate
    [SerializeField] Vector3 center;
    [SerializeField] float amplitude;
    // The speed of the animation
    [SerializeField] float delta;

    Vector3 pos;
    float angle = 0.0f;

    void Start()
    {
        // Use the original position as the center of the oscillation
        center = transform.position;
    }

    // Update is called once per frame
    void Update()
    {
        // Start at the center
        pos = center;    
        // Add the cosine function
        pos.x = pos.x + Mathf.Cos(angle) * amplitude;
        // Update the position of the object
        transform.position = pos;
        // Change the angle to create the animation
        angle += delta;
    }
}
