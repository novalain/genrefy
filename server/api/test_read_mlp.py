

import scipy.io.wavfile as wav
import numpy as np

import sys
sys.path.append("../classifiers")
import read_mfcc_data as mfcc_reader

from python_speech_features import mfcc
import pickle

def unpickle():
  with file('mlp', 'rb') as f:
      return pickle.load(f)


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


X_train, y_train, X_test, y_test = mfcc_reader.read_mfcc_data('../train_set.npy',nr_train = 70, nr_test = 30,nr_categories = 4);

nearest_neighbor = NearestNeighbor()
nearest_neighbor.train(X_train, y_train)




sizes = np.zeros((2900, 13))
HZ,signal = wav.read('../../dataset/genres/rock/rock.00088.wav');

mfcc_feat = mfcc(signal,HZ)

print 'shape ', mfcc_feat.shape
mfcc_feat_resize = mfcc_feat[:sizes.shape[0], :sizes.shape[1]] 
print 'shape ', mfcc_feat_resize.shape
mfcc_feat_flat = mfcc_feat_resize.reshape(sizes.shape[0] * sizes.shape[1])
print 'shape ',mfcc_feat_flat.reshape((mfcc_feat_flat.shape[0],1)).shape
mfcc_feat_flat = mfcc_feat_flat.reshape((mfcc_feat_flat.shape[0],1)).T
Yte_predict = nearest_neighbor.predict(mfcc_feat_flat)
print 'Yte_predict ',Yte_predict
# mlp = unpickle()
# y = mlp.predict(mfcc_feat_flat)
