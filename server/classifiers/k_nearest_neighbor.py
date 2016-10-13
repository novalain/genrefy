import numpy as np
import read_mfcc_data as mfcc_reader

# calculate genre by using k-nearest neighbors
class KNearestNeighbor(object):
  def __init__(self):
    pass

  def train(self, X, y):
    """ X is N x D where each row is an example. Y is 1-dimension of size N """
    # the nearest neighbor classifier simply remembers all the training data
    self.Xtr = X
    self.ytr = y

  def predict(self, X, k = 7):
    """ X is N x D where each row is an example we wish to predict label for """
    num_test = X.shape[0]
    # lets make sure that the output type matches the input type
    Ypred = np.zeros(num_test, dtype = self.ytr.dtype)

    # loop over all test rows
    for i in xrange(num_test):
      # find the nearest training image to the i'th test image
      # using the L1 distance (sum of absolute value differences)
      distances = np.sum(np.abs(self.Xtr - X[i,:]), axis = 1)

      # get the k smallest distances
      sorted_distance = sorted(distances)
      neighbors = []
      for x in range(k):
        neighbors.append(sorted_distance[x])

      # get index for the k smallest values
      neighbor_indexes = []
      for x in range(k):
        neighbor_indexes.append(np.where(distances == neighbors[x]))

      predict_values = []
      for x in range(k):
        predict_values.append(self.ytr[neighbor_indexes[x]])

      # return the genre that appears most often of the k genres
      a = np.array(predict_values).astype(int)
      counts = np.bincount(a[:,0])
      Ypred[i] = np.argmax(counts)

    return Ypred


# X_train, y_train, X_test, y_test = mfcc_reader.read_mfcc_data('../classifiers/train_set.npy',nr_train = 80, nr_test = 20,nr_categories = 4);

# k_nearest_neighbor = KNearestNeighbor()
# k_nearest_neighbor.train(X_train, y_train)
# Yte_predict = k_nearest_neighbor.predict(X_test)

# print 'accuracy: %f' % ( np.mean(Yte_predict == y_test) )