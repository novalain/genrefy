import numpy as np
import read_mfcc_data as mfcc_reader

class NearestNeighbor(object):
  def __init__(self):
    pass

  def train(self, X, y):
    """ X is N x D where each row is an example. Y is 1-dimension of size N """
    # the nearest neighbor classifier simply remembers all the training data
    self.Xtr = X
    self.ytr = y

  def predict(self, X):
    """ X is N x D where each row is an example we wish to predict label for """
    num_test = X.shape[0]
    # lets make sure that the output type matches the input type
    Ypred = np.zeros(num_test, dtype = self.ytr.dtype)

    # loop over all test rows
    for i in xrange(num_test):
      # find the nearest training image to the i'th test image
      # using the L1 distance (sum of absolute value differences)
      distances = np.sum(np.abs(self.Xtr - X[i,:]), axis = 1)
      min_index = np.argmin(distances) # get the index with smallest distance
      Ypred[i] = self.ytr[min_index] # predict the label of the nearest example

    return Ypred


# X_train, y_train, X_test, y_test = mfcc_reader.read_mfcc_data('/train_set.npy',nr_train = 90, nr_test = 5,nr_categories = 4);

# nearest_neighbor = NearestNeighbor()
# nearest_neighbor.train(X_train, y_train)
# Yte_predict = nearest_neighbor.predict(X_test)

# print 'accuracy: %f' % ( np.mean(Yte_predict == y_test) )
