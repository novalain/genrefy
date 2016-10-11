import numpy as np
import read_mfcc_data as mfcc_reader

class klDivergence(object):
  def __init__(self):
    pass

  def predict(self, X_train, X_test, Y_train):

    num_test = X_test.shape[0]

    # make sure that the output type matches the input type
    Ypred = np.zeros(num_test, dtype = Y_train.dtype)

    for i in xrange(num_test):

      # get the kullback - Leibler divergence between trained and test
      logTerm = np.log(np.divide(X_train, X_test[i,:]+0.0001))
      diff = np.sum(X_train * logTerm, axis = 1)
      #print diff
      min_index = np.argmin(diff)

      Ypred[i] = Y_train[min_index]

    return Ypred

# get data from mfcc reader
X_train, Y_train, X_test, Y_test = mfcc_reader.read_mfcc_data('train_set.npy',nr_train = 70, nr_test = 30,nr_categories = 4);

# add up with smallest value to get values over 0
X_train += np.abs(np.min(X_test))
X_test += np.abs(np.min(X_test))
kl_divergence = klDivergence()

Yte_predict = kl_divergence.predict(X_train, X_test, Y_train)
print 'accuracy: %f' % ( np.mean(Yte_predict == Y_test) )