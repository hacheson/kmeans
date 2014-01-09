/* Class definitions */

/* A Point has a position defined by x, y and a centroid that it can be assigned to.
  When no centroid is assigned, the following is true: this.centroid === undefined
  Points are created when data is loaded. You shouldn't need to call new Point(...).
*/
function Point(x, y, centroid) {
  this.x = x;
  this.y = y;
  this.centroid = centroid;
}

/* A Centroid has a position defined by x,y.
  Centroids are created and removed by clicking on the Add Centroid and Remove Centroid buttons.
  You shouldn't need to call new Centroid(...).
  The id field is needed so that the same color is always used when displaying the centroid. Ignore this field.
*/ 
function Centroid(x, y, id) {
  this.x = x;
  this.y = y;
  this.id = id;
}

/* App variables */

//centroids is a list of the current centroids. It starts empty until you click on add centroid.
var centroids = [];

//points is a list of currently displayed points.
var points = [];


/* IMPLEMENT THE FUNCTIONS BELOW
--------------------------------
*/

/* For each point, assign it to the cluster represented by the closest centroid */
function assignCentroids() {

  for(var p = 0; p < points.length; p++){
    var curr_best = Number.MAX_VALUE;
    var curr_centroid;
    var point = points[p];
    for(var c = 0; c < centroids.length; c++){
      var centroid = centroids[c];

      var dist = Math.sqrt(((point.x - centroid.x)*(point.x - centroid.x)) +((point.y - centroid.y)*(point.y - centroid.y)));
      if (dist < curr_best){
        curr_best = dist;
        curr_centroid = centroid;
      }
    }
    point.centroid = curr_centroid;
  }

  
}

/* Update the position of each centroid based on the points assigned to it. 
  The new position should be the mean of the positions of the points assigned to it.
*/
function updateCentroids() {
  for(var c = 0; c < centroids.length; c++){
    var centroid = centroids[c];
    var x_sum = 0;
    var y_sum = 0;
    var p_count = 0;
    for(var p = 0; p < points.length; p++){

      var point= points[p];
      if(point.centroid == centroid){
        p_count ++;
        x_sum += point.x;
        y_sum += point.y;
      }
      
    }
    centroid.x = x_sum/p_count;
    centroid.y = y_sum/p_count;
  }
}



