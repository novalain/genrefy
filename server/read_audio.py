

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
NR_FRAMES = 661800 #Above number of  framesis sufficient 
mffc_features_dic = {}
def readAUFiles():
  for k in range(len(GENRES)):
    mfcc_features_arr = []
    for i in range(100): 
      #String operation to get the filename
      file_name = file_name_prefix[:-len(str(i))] + str(i)
      f = sunau.Au_read(FILE_PATH+GENRES[k]+ '/' + GENRES[k] +'.'+ file_name +'.wav')
      # (rate,sig) = wav.read("../python_speech_features/english.wav")
      mfcc_feat = mfcc(sig,rate)
      fbank_feat = logfbank(sig,rate)
      mfcc_features_arr.append(mfcc_feat)

    mffc_features_dic[GENRES[k]] = mfcc_feat


readAUFiles()
print "Dictionary initialized: " 
print mffc_features_dic.keys()

