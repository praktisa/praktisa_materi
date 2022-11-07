


// OFA == Object Of Array
export function OFA_SEARCH(OFA, KEY, VALUE)
{
    for(var i = 0; i<OFA.length ; i++)
    {
        if(OFA[i][KEY] === VALUE){
            return i
        }
    }
}