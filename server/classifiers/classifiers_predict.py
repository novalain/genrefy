import scipy.io.wavfile as wav
import numpy as np
from python_speech_features import mfcc
import read_mfcc_data as mfcc_reader
import nearest_neighbor as NN
import pickle


MFCC_SIZES = np.zeros((2900, 13))
HZ = 22050
SIGNAL_LENGTH = HZ * 30

genres = ['hiphop', 'jazz', 'rock', 'disco']

X_train, y_train, X_test, y_test = mfcc_reader.read_mfcc_data('../classifiers/train_set.npy',nr_train = 90, nr_test = 10,nr_categories = 4);


#Read saved neural net model 
def unpickle():
  with file('mlp', 'rb') as f:
      return pickle.load(f)

def neuralNet(mfcc_features):
  mlp = unpickle()
  y_label = mlp.predict(mfcc_features)
  return int(y_label[0])

def kNearest(mfcc_features):

  return ""

def nearestNeighbor(mfcc_features):
  nearest_neighbor = NN.NearestNeighbor()
  nearest_neighbor.train(X_train, y_train)
  y_label = nearest_neighbor.predict(mfcc_features)
  return int(y_label[0])


def selectClassifierAndPredict(classify_type, signal):
  the_switch = {
      'neural_net'        : neuralNet,
      'k_nearest'         : kNearest,
      'nearest_neighbor' : nearestNeighbor
  }

  file_name ='temp_recording.wav'
  numpyArr  = wav.write(file_name, HZ, signal)
  mfcc_feat = mfcc(signal,HZ)
  mfcc_feat_resize = mfcc_feat[:MFCC_SIZES.shape[0], :MFCC_SIZES.shape[1]] 
  mfcc_feat_flat   = mfcc_feat_resize.reshape(MFCC_SIZES.shape[0] * MFCC_SIZES.shape[1])
  mfcc_features   = mfcc_feat_flat.reshape((mfcc_feat_flat.shape[0],1)).T #Resize to (37700, 1) for classifier 
  
  classify = the_switch.get(classify_type)
  label = classify(mfcc_features)
  return genres[label], file_name