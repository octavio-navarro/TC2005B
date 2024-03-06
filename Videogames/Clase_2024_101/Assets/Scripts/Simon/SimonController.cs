/*
Script to generate the sequence of buttons to show, and then compare with
the user inputs

Gilberto Echeverria
2024-03-06
*/

using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class SimonController : MonoBehaviour
{
    [SerializeField] List<int> sequence;
    [SerializeField] GameObject[] buttons;

    // Start is called before the first frame update
    void Start()
    {
        sequence = new List<int>();
        StartCoroutine(AddNumber());
    }

    // Update is called once per frame
    void Update()
    {
        
    }

    IEnumerator AddNumber()
    {
        for (int i=0; i<10; i++) {
            int num = Random.Range(0, buttons.Length);
            // Call a method on the Button script
            buttons[num].GetComponent<SimonButton>().HighLight();
            sequence.Add(num);
            yield return new WaitForSeconds(1);
        }
    }
}
