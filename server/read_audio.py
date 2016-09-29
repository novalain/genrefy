

import numpy as np 

from scipy.io.wavfile import write
import sounddevice as sd
import sunau 

#The music files contains of 22050Hz sample and 30 seconds. Which is: 30 * 22050 = 661500 frames. 
GENRES = ["jazz", "rock", "disco", "hiphop"]
FILE_PATH = "../dataset/genres/"
file_name_prefix = '00000'
NR_FRAMES = 661800 #Above number of  framesis sufficient 
audio_data_dic = {}
def readAUFiles():
  for k in range(len(GENRES)):
    audio_data = []
    for i in range(100): 
      #String operation to get the filename
      file_name = file_name_prefix[:-len(str(i))] + str(i)
      f = sunau.Au_read(FILE_PATH+GENRES[k]+ '/' + GENRES[k] +'.'+ file_name +'.au')
      data = np.fromstring(f.readframes(NR_FRAMES), dtype=np.int16)
      audio_data.append(data)

    audio_data_dic[GENRES[k]] = audio_data


readAUFiles()
print "Dictionary initialized: " 
print audio_data_dic.keys()
