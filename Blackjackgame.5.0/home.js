

let blackjackgame={
    'you': { 'scoreSpan': '#your-blackjack-result', 'div':'#your-box' , 'score':0},
    'dealer': { 'scoreSpan': '#dealer-blackjack-result', 'div':'#dealer-box' , 'score':0},
    'cards' : [ '2','3','4','5','6','7','8','9','10','A','K','Q','J'],
    'cardsMap' : {'2':2,'3':3,'4':4,'5':5,'6':6,'7':7,'8':8,'9':9,'10':10,'A':[1,11],'K':10,'Q':10,'J':10 },
    'wins':0,
    'losses' : 0,
    'draws' : 0,
    'isstand':false,
    'turnsover':false,
    'ishit' : false,
};

const You = blackjackgame['you']
const dealer = blackjackgame['dealer']
const hitsound = new Audio('sounds/swish.m4a');  
const winsound = new Audio('sounds/cash.mp3');
const losesound = new Audio('sounds/aww.mp3');

document.querySelector("#blackjack-hit-button").addEventListener('click',blackjackhit);
document.querySelector("#blackjack-stand-button").addEventListener('click',dealerlogic);
document.querySelector("#blackjack-deal-button").addEventListener('click',blackjackdealtemp);


function blackjackhit(){
    if(blackjackgame['isstand']===false)
    {
        blackjackgame['ishit'] = true;
        
        if(You['score']>21)
        {
        
        }
        else
        {
            let card = randomcard();
            showcard(card, You);
            updatescore(card,You);
            showscord(You);        
        }
    }
}



async function dealerlogic(){
    if(blackjackgame['ishit']===true)
    {
        blackjackgame['ishit']=false;
        blackjackgame['isstand']=true;
        
        if(dealer['score']>21)
        {
        
        }
        else
        {
            while( You['score']<=21 && ((dealer['score']<You['score'] ) || ((dealer['score']==You['score'])&&dealer['score']<21)))
            {
            let card = randomcard();
            showcard(card, dealer);
            updatescore(card,dealer);
            showscord(dealer);
            await sleep(1000);        
            }  
        }
        var x = computewinner();
        showresult(x);
        blackjackgame['isstand']=true;
        blackjackgame['ishit']=false;
        blackjackgame['turnsover'] = true;
    }
}

function blackjackdealtemp()
{
    blackjackdeal();
}

function sleep(ms)
{
    return new Promise(resolve => setTimeout(resolve,ms));
}


function randomcard()
{
    let randomindex = Math.floor(Math.random()*13);
    return blackjackgame['cards'][randomindex];
}


function showcard(card, hell)
{
    let cardimage = document.createElement('img');
    cardimage.src=`images/${card}.jpg`;
    document.querySelector(hell['div']).appendChild(cardimage);
    hitsound.play();
}

function blackjackdeal()
{
    
        if(blackjackgame['turnsover']==true)
        {
            let yourimages = document.querySelector('#your-box').querySelectorAll('img');
            let dealerimages = document.querySelector('#dealer-box').querySelectorAll('img');
    
            for(i=0; i<yourimages.length; i++)
            {
            yourimages[i].remove();
            }
    
            for(i=0; i<dealerimages.length; i++)
            {
                dealerimages[i].remove();
            }
    
            You['score'] = 0;
            dealer['score'] = 0;
    
            document.querySelector("#your-blackjack-result").textContent = 0;
            document.querySelector("#dealer-blackjack-result").textContent = 0;
            document.querySelector("#dealer-blackjack-result").style.color="white";
            document.querySelector("#your-blackjack-result").style.color="white";
            document.querySelector("#blackjack-result").textContent="Lets play!";
            document.querySelector("#blackjack-result").style.color="black";
    
            blackjackgame['turnsover']=false;
            blackjackgame['ishit']=false;
            blackjackgame['isstand']=false;
    
        }
}

function updatescore(card, activeplayer)
{
    if(card=="A")
    {    
        if(activeplayer['score'] + blackjackgame['cardsMap'][card][1]<=21)
        {
            activeplayer['score'] += blackjackgame['cardsMap'][card][1];
        }
        else
        {
            activeplayer['score'] += blackjackgame['cardsMap'][card][0];
        }
    }
    else
    {
    activeplayer['score'] += blackjackgame['cardsMap'][card];
    }
}


function showscord(activeplayer)
{
    if(activeplayer['score']>21)
    {
        document.querySelector(activeplayer['scoreSpan']).textContent = "Bust";
        document.querySelector(activeplayer['scoreSpan']).style.color="red";
    }
    else
    {
        document.querySelector(activeplayer['scoreSpan']).textContent = activeplayer['score'];
    }
}

function computewinner()
{
    let winnner;
    
    if(You['score']<=21)
    {
        if((You['score']>dealer['score'] )|| (dealer['score']>21))
        {
            winnner = You;
        }
        else if(You['score']<dealer['score'])
        {
            winnner= dealer;
        }
        else if(You['score']===dealer['score'])
        {
    
        }
    }
    else
    {
        winnner = dealer;
    }
    
    return winnner;
}


function showresult(winner)
{
    let message,messagecolor;
    
    if(winner==You)
    {
        message = 'you won!'
        messagecolor = 'green';
        winsound.play();
        blackjackgame['wins']++;
    }
    else if(winner == dealer)
    {
        message = 'you lose!'
        messagecolor = 'red';
        losesound.play();
        blackjackgame['losses']++;
    }
    else
    {
        message = 'Tied!'
        messagecolor = 'yello';
        blackjackgame['draws']++;    
    }

    document.querySelector("#wins").textContent=blackjackgame['wins'];
    document.querySelector("#losses").textContent=blackjackgame['losses'];
    document.querySelector("#draws").textContent=blackjackgame['draws'];    
    document.querySelector('#blackjack-result').textContent = message;
    document.querySelector('#blackjack-result').style.color = messagecolor;

}