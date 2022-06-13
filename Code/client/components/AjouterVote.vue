<template>
  <div class="container">
         <ul class="checkout-bar">
            <li class="visited"><a href="#get-started" data-toggle="tab">Informations Vote</a></li>
            <li class="active"><a href="#about-you" data-toggle="tab">Candidats</a></li>
            <li class=""><a href="#looking-for" data-toggle="tab">Participants</a></li>
            <li class=""><a href="#">Validation</a></li>
        </ul>
      <div class="row">
        <div class="formulaireVote col-md-6 offset-md-3">
          <form>
                <div class="mb-3">
                    <label for="nameVoteInput" class="form-label">Nom du suffrage</label>
                    <input type="text" class="form-control" id="nameVoteInput">
                </div>
                <div class="mb-3">
                    <label for="descriptionVoteInput" class="form-label">Description</label>
                    <textarea id="descriptionVoteInput" class="form-control"></textarea>
                </div>
                <button type="submit" class="btn btn-primary col-md-6 offset-md-3">Suivant</button>
            </form>
        </div>
      </div>
      
  </div>
</template>

<script>
module.exports = {

}
</script>

<style>

.checkout-wrap {
    font-family:'PT Sans Caption', sans-serif;
    margin: auto auto;
    z-index: 0;
}

.checkout-bar{

    margin-top: 50px!important;
    margin-bottom: 50px!important;
    margin-left: 5%!important;
    margin-right: 20%!important;
}
ul.checkout-bar li {
    color: #ccc;
    font-size: 16px;
    font-weight: 600;
    position: relative;
    display: inline-block;
    margin: 50px auto;
    padding: 0;
    text-align: center;
    width: 22.5%;
}
ul.checkout-bar li:before {
    -webkit-box-shadow: inset 2px 2px 2px 0px rgba(0, 0, 0, 0.2);
    box-shadow: inset 2px 2px 2px 0px rgba(0, 0, 0, 0.2);
    background: #ddd;
    border: 2px solid #FFF;
    border-radius: 50%;
    color: #fff;
    font-size: 16px;
    font-weight: 700;
    text-align: center;
    text-shadow: 1px 1px rgba(0, 0, 0, 0.2);
    height: 34px;
    left: 40%;
    line-height: 34px;
    position: absolute;
    top: -60px;
    width: 34px;
    z-index: 99999;
}
ul.checkout-bar li.active {
    color: #A6447A;
    font-weight: bold;
}
ul.checkout-bar li.active:before {
    background: #A6447A;
}
ul.checkout-bar li.visited {
    color: #036c99;
    z-index: 99999;
    background: none;
}
ul.checkout-bar li.visited:before {
    background: #036c99;
    z-index: 99999;
}
ul.checkout-bar li:nth-child(1):before {
    content:"1";
}
ul.checkout-bar li:nth-child(2):before {
    content:"2";
}
ul.checkout-bar li:nth-child(3):before {
    content:"3";
}
ul.checkout-bar li:nth-child(4):before {
    content:"4";
}
ul.checkout-bar li:nth-child(5):before {
    content:"5";
}
ul.checkout-bar li:nth-child(6):before {
    content:"6";
}
ul.checkout-bar a {
    color: #ccc;
    font-size: 16px;
    font-weight: 600;
    text-decoration: none;
}
ul.checkout-bar li.active a {
    color: #A6447A;
}
ul.checkout-bar li.visited a {
    color: #036c99;
}
.checkout-bar li.active:after {
    -webkit-animation: myanimation 3s 0;
    background-size: 35px 35px;
    background-color: #A6447A;
    background-image: -webkit-linear-gradient(-45deg, rgba(255, 255, 255, 0.2) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.2) 50%, rgba(255, 255, 255, 0.2) 75%, transparent 75%, transparent);
    background-image: -moz-linear-gradient(-45deg, rgba(255, 255, 255, 0.2) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.2) 50%, rgba(255, 255, 255, 0.2) 75%, transparent 75%, transparent);
    -webkit-box-shadow: inset 2px 2px 2px 0px rgba(0, 0, 0, 0.2);
    box-shadow: inset 2px 2px 2px 0px rgba(0, 0, 0, 0.2);
    content:"";
    height: 15px;
    width: 50%;
    left: 50%;
    position: absolute;
    top: -50px;
    z-index: 0;
}
ul.checkout-bar {
    -webkit-box-shadow: inset 2px 2px 2px 0px rgba(0, 0, 0, 0.2);
    box-shadow: inset 2px 2px 2px 0px rgba(0, 0, 0, 0.2);
    background-size: 35px 35px;
    background-color: #EcEcEc;
    background-image: -webkit-linear-gradient(-45deg, rgba(255, 255, 255, 0.4) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.4) 50%, rgba(255, 255, 255, 0.4) 75%, transparent 75%, transparent);
    background-image: -moz-linear-gradient(-45deg, rgba(255, 255, 255, 0.4) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.4) 50%, rgba(255, 255, 255, 0.4) 75%, transparent 75%, transparent);
    border-radius: 15px;
    height: 15px;
    margin: 0 -15px 0;
    padding: 0;
    position: absolute;
    width: 60%;
}
ul.checkout-bar:before {
    background-size: 35px 35px;
    background-color: #036c99;
    background-image: -webkit-linear-gradient(-45deg, rgba(255, 255, 255, 0.2) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.2) 50%, rgba(255, 255, 255, 0.2) 75%, transparent 75%, transparent);
    background-image: -moz-linear-gradient(-45deg, rgba(255, 255, 255, 0.2) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.2) 50%, rgba(255, 255, 255, 0.2) 75%, transparent 75%, transparent);
    -webkit-box-shadow: inset 2px 2px 2px 0px rgba(0, 0, 0, 0.2);
    box-shadow: inset 2px 2px 2px 0px rgba(0, 0, 0, 0.2);
    border-radius: 15px;
    content:" ";
    height: 15px;
    left: 0;
    position: absolute;
    width: 14%;
}
ul.checkout-bar li.visited:after {
    background-size: 35px 35px;
    background-color: #036c99;
    background-image: -webkit-linear-gradient(-45deg, rgba(255, 255, 255, 0.2) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.2) 50%, rgba(255, 255, 255, 0.2) 75%, transparent 75%, transparent);
    background-image: -moz-linear-gradient(-45deg, rgba(255, 255, 255, 0.2) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.2) 50%, rgba(255, 255, 255, 0.2) 75%, transparent 75%, transparent);
    -webkit-box-shadow: inset 2px 2px 2px 0px rgba(0, 0, 0, 0.2);
    box-shadow: inset 2px 2px 2px 0px rgba(0, 0, 0, 0.2);
    content:"";
    height: 15px;
    left: 50%;
    position: absolute;
    top: -50px;
    width: 100%;
    z-index: 99;
}

.formulaireVote{
    margin-top: 150px;
}
</style>