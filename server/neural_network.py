from sklearn.neural_network import MLPClassifier
import read_mfcc_data as mfcc_reader
import numpy as np
import matplotlib.pyplot as plt


X_train, y_train, X_test, y_test = mfcc_reader.read_mfcc_data('train_set.npy',nr_train = 70, nr_test = 30,nr_categories = 4);


hidden_layer_s = [110, 120, 130, 140, 150, 160, 170, 180, 190]

batch_s = [10, 30, 50, 70, 100, 120, 150]
best_batch = 10
best_pred_accuracy = 0
best_hidden_layer = 10
best_mlp = MLPClassifier()

for i in range(len(hidden_layer_s)):
  for k in range(len(batch_s)):
    mlp = MLPClassifier(hidden_layer_sizes=hidden_layer_s[i],verbose=True, batch_size=batch_s[k], learning_rate_init=0.001)
    mlp.fit(X_train, y_train)
    ypred = mlp.predict(X_test)
    pred_accuracy = np.mean(ypred == y_test)
    print 'Accuracy: %f' % ( np.mean(ypred == y_test) ),  " Hiddenlayer size ", hidden_layer_s[i], ' Batch_size: ', batch_s[k]
    if pred_accuracy > best_pred_accuracy:
      best_pred_accuracy = pred_accuracy
      best_mlp = mlp
      best_hidden_layer = hidden_layer_s[i]
      best_batch = batch_s[k]
print 'Best Accuracy: ' , best_pred_accuracy , ' with hiddenLayer size: ', best_hidden_layer,  ' best_batch : ',best_batch

