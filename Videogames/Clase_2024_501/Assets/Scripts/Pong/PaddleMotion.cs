
/*
Control the movements of a game paddle

Gilberto Echeverria
2024-04-09
*/

using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class PaddleMotion : MonoBehaviour
{
    [SerializeField] float speed;
    [SerializeField] Vector2 direction;
    [SerializeField] KeyCode positiveKey;
    [SerializeField] KeyCode negativeKey;
    [SerializeField] float limit;

    // Update is called once per frame
    void Update()
    {
        if (Input.GetKey(positiveKey) && transform.position.y < limit) {
            transform.Translate(direction * speed * Time.deltaTime);
        } else if (Input.GetKey(negativeKey) && transform.position.y > -limit) {
            transform.Translate(-direction * speed * Time.deltaTime);
        }
    }
}
