(() => {
	//stub
	console.log('link successful')

const
	lineup = document.querySelector('.lineUp'),
	stage = document.querySelector('.stage'),
	dropZones = document.querySelectorAll('.drop-zone'),
	dragZones = document.querySelectorAll('.drag-zone');

let
	lightBox = document.querySelector('.lightbox'),
	closeButton = document.querySelector('.close-lightbox'),
	resetButton = document.querySelector('.reset'),
	draggableChars = document.querySelectorAll('.drop-image');

//get id data for character when you start to drag it
	draggableChars.forEach(piece => {
		piece.addEventListener("dragstart", function(e) {
			e.dataTransfer.setData("text/plain", this.id);
		});
	});

  dropZones.forEach(zone =>{
      zone.addEventListener("dragover", function(e) {
          e.preventDefault();
      	});
      zone.addEventListener("drop", function(e) {
          e.preventDefault();
//get the id data of dragged element
          let draggedElement = e.dataTransfer.getData("text/plain");
          console.log(draggedElement);
//if the "zone" has a child count of "0"
        	if (zone.childElementCount == 0 ) {
//set audio
						newAudio = document.createElement('audio');
						newAudio.loop = 'true';
						newAudio.src = (`audio/${draggedElement}.mp3`);
						newAudio.setAttribute('id', 'audio-file');
//set the drop-zone class to the drag-zone class
						zone.classList.remove();
						zone.classList.add("drag-zone");
//append image to drop-zone
          	e.target.appendChild(document.querySelector(`#${draggedElement}`));
						document.querySelector(`#${draggedElement}`).setAttribute("draggable", "false");
//append audio-element to drop-zone
						zone.appendChild(newAudio);
					};
//set all audio to 0
					let audioFile = document.querySelectorAll('#audio-file');
						audioFile.forEach(file =>{
							file.currentTime = 0;
					});
//Play Audio
						newAudio.play();
      });
  });

//CLOSE INSTRUCTION WINDOW//
	function closeLightBox(e) {
    event.preventDefault();
//make the class display:none;
    lightBox.classList.add('hide-lightbox');
	};

//RESET PIECES TO LINE-UP//
	function reset(e) {
		dropZones.forEach(zone => {
//give the drop-zone its class back
			zone.classList.remove("drag-zone");
			zone.classList.add("drop-zone");
//if zone child cout does not equal 0
			if (zone.childElementCount !== 0 ){
//remove the audio file
				zone.removeChild(document.getElementById('audio-file'));
//place the pieces back into 'line-up'
				piece = zone.firstElementChild;
	//make draggable again
				piece.setAttribute("draggable", "true");
//find the piece's original parent
				zoneId = (piece.getAttribute('id')+"zone");
				dZone = document.querySelector(`#${zoneId}`);
	//append piece to original parent
				dZone.appendChild(piece)};
			});
		};


	closeButton.addEventListener("click", closeLightBox);
	resetButton.addEventListener("click", reset);

})();
