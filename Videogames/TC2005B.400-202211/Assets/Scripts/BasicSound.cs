/*
Activate sounds attached to an object

Gilberto Echeverria
*/

using UnityEngine;

public class BasicSound : MonoBehaviour
{
    // Using multiple sources, fill them by draggin in the Unity interface
    [SerializeField] AudioSource snareSource;
    [SerializeField] AudioSource h_hatSource;

    // Update is called once per frame
    void Update()
    {
        // Activate the sounds when pressing keys
        if (Input.GetKeyDown(KeyCode.D)) {
            snareSource.Play();
        }
        if (Input.GetKeyDown(KeyCode.F)) {
            h_hatSource.Play();
        }
    }
}