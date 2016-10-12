import scipy.io.wavfile as wav
import numpy as np
from python_speech_features import mfcc
import read_mfcc_data as mfcc_reader
import nearest_neighbor as NN
import k_nearest_neighbor as KNN
import pickle




genres = ['hiphop', 'jazz', 'rock', 'disco']

X_train, y_train, X_test, y_test = mfcc_reader.read_mfcc_data('../classifiers/train_set.npy',nr_train = 100, nr_test = 0,nr_categories = 4);

class ClassifierHandler(object):
  MFCC_SIZES = np.zeros((2900, 13))
  HZ = 22050
  SIGNAL_LENGTH = HZ * 30
  def __init__(self):
    self.k = 0
    

  def setK(self,theK):
    self.k = int(theK)
    
  def getK(self):
    return self.k

  #Read saved neural net model 
  def unpickle():
    with file('mlp', 'rb') as f:
        return pickle.load(f)

  def neuralNet(self,mfcc_features):
    mlp = unpickle()
    y_label = mlp.predict(mfcc_features)
    return int(y_label[0])

  def kNearest(self,mfcc_features):
    k_nearest_neighbor = KNN.KNearestNeighbor()
    k_nearest_neighbor.train(X_train, y_train)
    k = self.getK()
    print 'selected k ', k
    y_label = k_nearest_neighbor.predict(mfcc_features,k)
    return int(y_label[0])

  def nearestNeighbor(self,mfcc_features):
    nearest_neighbor = NN.NearestNeighbor()
    nearest_neighbor.train(X_train, y_train)
    y_label = nearest_neighbor.predict(mfcc_features)
    return int(y_label[0])


  def selectClassifierAndPredict(self,classify_type, signal):
    the_switch = {
        'neural_network'        : self.neuralNet,
        'k_nearest'             : self.kNearest,
        'nearest'               : self.nearestNeighbor
    }

    file_name ='temp_recording.wav'
    numpyArr  = wav.write(file_name, self.HZ, signal)
    mfcc_feat = mfcc(signal,self.HZ)
    mfcc_feat_resize = mfcc_feat[:self.MFCC_SIZES.shape[0], :self.MFCC_SIZES.shape[1]] 
    mfcc_feat_flat   = mfcc_feat_resize.reshape(self.MFCC_SIZES.shape[0] * self.MFCC_SIZES.shape[1])
    mfcc_features   = mfcc_feat_flat.reshape((mfcc_feat_flat.shape[0],1)).T #Resize to (37700, 1) for classifier 
    print 'Running with ', classify_type
    classify = the_switch.get(classify_type)
    label = classify(mfcc_features)
    return genres[label], file_name

