

import numpy as np 

from scipy.io.wavfile import write
import scipy.io.wavfile as wav

from python_speech_features import mfcc
from python_speech_features import logfbank
import sunau 

#The music files contains of 22050Hz sample and 30 seconds. Which is: 30 * 22050 = 661500 frames. 
GENRES = ["jazz", "rock", "disco", "hiphop"]
FILE_PATH = "../dataset/genres/"
file_name_prefix = '00000'
mffc_features_dic_test = {}
mffc_features_dic_train = {}
sizes = np.zeros((2900, 13))
nr_songs_per_category = 100
def readAUFiles():
  for k in range(len(GENRES)):
    
    mfcc_features_arr_train = np.zeros((nr_songs_per_category,sizes.shape[0] * sizes.shape[1]))
    for i in range(nr_songs_per_category): 
      #String operation to get the filename
      file_name = file_name_prefix[:-len(str(i))] + str(i)

      rate,sig = wav.read(FILE_PATH+GENRES[k]+ '/' + GENRES[k] +'.'+ file_name +'.wav')

      mfcc_feat = mfcc(sig,rate)
      mfcc_feat_resize = mfcc_feat[:sizes.shape[0], :sizes.shape[1]] 
      mfcc_feat_flat = mfcc_feat_resize.reshape(sizes.shape[0] * sizes.shape[1])

      print np.array(mfcc_feat_flat[0])
      print mfcc_feat_flat.shape
      print '-------'
      
      mfcc_features_arr_train[i,:] = (mfcc_feat_flat)


    mffc_features_dic_train[GENRES[k]] = mfcc_features_arr_train


readAUFiles()
print "Dictionary initialized: " 
print mffc_features_dic_train
np.save('train_set.npy', mffc_features_dic_train)

