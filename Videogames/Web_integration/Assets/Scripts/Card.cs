using System.Collections;
using System.Collections.Generic;

[System.Serializable]
public class Card 
{

   // The attributes of the card class must match the structure of the JSON data
   public int card_id;
   public string card_name;
   public string card_description;
   public int card_cost; 
}

[System.Serializable]
public class Cards
{
   public List<Card> cards;
}