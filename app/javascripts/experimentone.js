(function() {

  function randomGenes() {
    var genes = new Uint8Array(GENOME_LENGTH);
    for(i=0; i < GENOME_LENGTH; i++) {
      genes[i] = Math.random() * 256;
    }
    return genes;
  }
    
  // Controls
  
  function recreate() {
    var [sire, matron] = _.sample(all_genes, 2);
    sire = string_to_genes(sire);
    matron = string_to_genes(matron);
    const genes = cross_breed(matron, sire);
    all_genes.push(genes_to_string(genes));
  
    artist.render(genes);
    matron_artist.render(matron);
    sire_artist.render(sire);
    
    return genes;
  }
  
  
  function string_to_genes(genestring) {
    var genestrings = genestring.match(/.{2}/g);
    var genes = new Uint8Array(GENOME_LENGTH);
    for(i=0; i < GENOME_LENGTH; i++) {
      genes[i] = parseInt(genestrings[i], 16);
    }	
    return genes;
  }
  
  function genes_to_string(genes) {
    var s = "";
    genes.forEach(function(g) {
      s+= ("0"+(Number(g).toString(16))).slice(-2)
    });
    return s;
  }
  
  function print_genestring(genes) {	
    $("#genestring").val(genes_to_string(genes));
  }
  
  function add_controls(genes) {
    $("#controls").empty();
    for(i=0; i< GENOME_LENGTH; i++) {
    
      $("#controls").append('<input type="text" data-slider-min="0" data-slider-max="255" data-slider-step="1" data-slider-value="'+ genes[i] +'" data-gene="'+ i +'"/>');
  
      $("#controls input").slider({
        formatter: function(value) {
          return ''+value;
        }
      });
      
      if (i % 8 == 7) { $("#controls").append('<hr/>'); }
     }
     
     $("#controls input").on("slide", function(e) {
         var value = e.target.value;
        var gene = parseInt($(e.target).data('gene'));      
        genes[gene] = value;
        $("#gene_val_"+gene).text(value);
        artist.render(genes)
        print_genestring(genes)
     });
     
     $("#genestring").change( function(e) {
         var value = e.target.value;
        genes = string_to_genes(value);
        artist.render(genes);
     });
  }
     
     
  // simple breeding for now
  function cross_breed(matron, sire) {
    var genes = new Uint8Array(GENOME_LENGTH);
    for(i=0; i < GENOME_LENGTH; i++) {
      const rand = Math.random();
      if (rand < 0.9) {
        genes[i] = rand < 0.7 ? sire[i] : matron[i];
      }
      else {
        genes[i] = Math.random() * 256;
      }
    }
    
  /*
    const rand = Math.random();    
    for(i=8; i < GENOME_LENGTH; i++) {
      if (rand < 0.9) {
        genes[i] = rand < 0.7 ? sire[i] : matron[i];
      }
      else {
        genes[i] = Math.random() * 256;
      }
    } 
  */
    
    return genes;
  }
  
  cool_genes = [
    "2c756b5f8893b110005470a8c0a7c0799b8c714d542c21618f003fa900489e00",	
    "caa3439b66b98710b7a6cafdc6a53f8a2c82e54d603b2167b38369aafb489e0",
    "7e76a9c8ca7542bb3b2887affff240c8fd005e62eff99b61b090fff000009a00"
  ];
  
  all_genes = cool_genes.slice() // lol :)
  
  
  function rotate() {
    window.setInterval(function(){
       run();
    }, 200);
  }
  
  
  function run() {
    const genes = recreate();
    add_controls(genes); 
    print_genestring(genes);
  }
  
  $(document).ready(function() {
    artist = TulipArtist({width: 600, target: 'tulip'})
    matron_artist = TulipArtist({width: 200, target: 'matron'})
    sire_artist = TulipArtist({width: 200, target: 'sire'})
  
    $('#draw').click(function() {  
    run();
    });
    run();
    
    // rotate();
  });
  
  }).call(this);
  