/*
Read information from PlayerPrefs and apply it to an object

Gilberto Echeverria
*/

using UnityEngine;
using UnityEngine.SceneManagement;

public class ApplyAngleValue : MonoBehaviour
{
    // Start is called before the first frame update
    void Start()
    {
        float angle = PlayerPrefs.GetFloat("Angle", 5.0f);
        transform.rotation = Quaternion.Euler(0, 0, angle);
    }
}
