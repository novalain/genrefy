import numpy as np


def read_mfcc_data(file,nr_train = 70, nr_test = 30,nr_categories = 4):
  train_set = np.load(file)
  
  y_label = train_set.item().keys()


  #Mfcc features size
  D = train_set.item()[y_label[1]].shape[1]
  
  y_train = np.zeros(nr_train*nr_categories)
  X_train = np.zeros((nr_train*nr_categories,D))
  y_test = np.zeros(nr_test * nr_categories)
  X_test = np.zeros((nr_test * nr_categories,D))



  #divide data into train and test
  index = 0
  for k in range(len(y_label)):
    genre = y_label[k]
    print "index " , y_label.index(genre) , ' genre: ', genre
    for i in range(nr_train):
      y_train[index] = y_label.index(genre)
      X_train[index,:] = train_set.item()[genre][i]
      index = index +1

  #test data
  index = 0
  for k in range(len(y_label)):
    genre = y_label[k]
    for i in range(nr_train,nr_test + nr_train):
      y_test[index] = y_label.index(genre)
      X_test[index,:] = train_set.item()[genre][i]
      index = index + 1

  return X_train, y_train, X_test, y_test
