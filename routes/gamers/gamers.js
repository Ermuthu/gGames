var express = require('express');
var router = express.Router();
const knex = require('../../db/knex');


/* GET home page. */
router.get('/', (req, res) => {
	knex('gamer')
	.select()
	.then(gamers =>{
  res.render('gamers/gamers', {gamers:gamers});
	})
});

router.get('/:id', (req, res) =>{
	knex('game')
	.select()
	.then(games =>{
	knex('gamer')
	.select()
	.where('gamer.id', req.params.id)
	.leftJoin('gamer_game', 'gamer.id', 'gamer_id')
	.leftJoin('game', 'game_id', 'game.id')
	.then(gamer =>{
		let gamesData = []
		let gameObj = new Object()
		for (var i = 0; i < gamer.length; i++) {
			gameObj = new Object();
			gameObj.title = gamer[i].title
			gamesData.push(gameObj)
		}
		console.log(gamesData)
		res.render('gamers/single', {gamer:gamer[0], gamesData:gamesData, games:games})
		})
	})
});


// router.post('/', (req, res) =>{
// 	knex('gamer')
// 	.insert({
// 		name:req.body.name,
// 	})
// 	.then( () =>{
// 		res.redirect('gamers')
// 	})
// })

router.post('/', (req, res) =>{
	knex('gamer_game')
	.insert({
		gamer_id: 666,
		game_id: 999
	})
	.then( (stuff) =>{
		console.log(stuff);
		res.redirect('/single')
	})
})


module.exports = router;
