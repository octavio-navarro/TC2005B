/*
Define the classes that will store data from the API

Gilberto Echeverria
2024-05-13
*/

using System.Collections;
using System.Collections.Generic;

[System.Serializable]
public class ColorButton
{
    public int id;
    public float r;
    public float g;
    public float b;
}

[System.Serializable]
public class ColorButtons
{
    public List<ColorButton> buttons;
}