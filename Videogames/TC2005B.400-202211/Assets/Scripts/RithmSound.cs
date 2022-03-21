/*
Activate sounds attached to an object
Use time control to keep a rithm

Gilberto Echeverria
*/

using UnityEngine;

public class RithmSound : MonoBehaviour
{
    [SerializeField] float delay;

    // When is the next hit going to happen
    float nextHit;

    AudioSource audioSource;

    void Start()
    {
        audioSource = GetComponent<AudioSource>();
        // Initialize the variable for the time
        nextHit = delay;
    }

    // A method that is called at a fixed rate
    void FixedUpdate() {
        // Check if it is time to make the sound
        if (Time.time >= nextHit) {
            audioSource.Play();
            // Update the time for the next sound
            nextHit = Time.time + delay;
        }
    }
}
