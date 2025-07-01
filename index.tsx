import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { faker } from '@faker-js/faker';

export default function SelectPaymentMode() {
  const [frozen, setFrozen] = useState(true);
  const [cardDetails, setCardDetails] = useState(generateCardDetails());

  function generateCardDetails() {
    return {
      name: faker.name.fullName(),
      number: faker.finance.creditCardNumber('#### #### #### ####'),
      expiry: faker.date.future().toISOString().slice(2, 7).replace('-', '/'),
      cvv: '***',
    };
  }

  const handleToggleFreeze = () => {
    if (!frozen) {
      setFrozen(true);
    } else {
      setCardDetails(generateCardDetails());
      setFrozen(false);
    }
  };

  const numberLines = cardDetails.number.split(' ');

  const renderStylizedCVV = () => {
    const stars = cardDetails.cvv.split('');
    return (
      <View style={{ flexDirection: 'row' }}>
        {stars.map((char, index) => {
          return (
            <Text
              key={index}
              style={index === 2 ? styles.lastCVVStar : styles.value}
            >
              {char}
            </Text>
          );
        })}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      <View style={styles.content}>
        <Text style={styles.title}>select payment mode</Text>
        <Text style={styles.subtitle}>
          choose your preferred payment method to make payment.
        </Text>

        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.payButton}>
            <Text style={styles.payText}>pay</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cardButton}>
            <Text style={styles.cardText}>card</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.cardLabel}>YOUR DIGITAL DEBIT CARD</Text>

        <View style={styles.cardRow}>
          {frozen ? (
            <View style={styles.cardImageWrapper}>
              <Image
                source={require('../assets/images/card5.png')}
                style={styles.cardImage}
              />
            </View>
          ) : (
            <View style={styles.cardBlurWrapper}>
              <View style={[styles.cardImageGenerated, styles.unfrozenBorder]}>
                <View style={styles.cardHeader}>
                  <Image
                    source={require('../assets/images/yolo_logo.png')}
                    style={styles.yoloImage}
                    resizeMode="contain"
                  />
                  <Image
                    source={require('../assets/images/yesbank.png')}
                    style={styles.bankLogo}
                    resizeMode="contain"
                  />
                </View>

                <View style={styles.cardNumbers}>
                  {numberLines.map((line, index) => (
                    <Text key={index} style={styles.numberLine}>
                      {line}
                    </Text>
                  ))}
                </View>

                <View style={styles.copyRow}>
                  <MaterialCommunityIcons
                    name="content-copy"
                    size={18}
                    color="red"
                  />
                  <Text style={styles.copyText}>copy details</Text>
                </View>

                <Image
                  source={require('../assets/images/rupay.png')}
                  style={styles.rupayLogo}
                  resizeMode="contain"
                />

                <View style={styles.expiryCvvRow}>
                  <View>
                    <Text style={styles.label}>expiry</Text>
                    <Text style={styles.value}>{cardDetails.expiry}</Text>
                  </View>
                  <View style={{ marginTop: 8 }}>
                    <Text style={styles.label}>cvv</Text>
                    <View style={styles.cvvRow}>
                      {renderStylizedCVV()}
                      <Ionicons
                        name="eye-off"
                        size={25}
                        color="red"
                        style={{ marginLeft: 6 }}
                      />
                    </View>
                  </View>
                </View>
              </View>
            </View>
          )}

          <View style={styles.unfreezeSection}>
            <TouchableOpacity onPress={handleToggleFreeze}>
              <View
                style={[
                  styles.circleIcon,
                  {
                    borderColor: frozen ? '#A90808' : '#fff',
                  },
                ]}
              >
                <Ionicons
                  name="snow"
                  size={24}
                  color={frozen ? '#A90808' : '#fff'}
                />
              </View>
            </TouchableOpacity>
            <Text
              style={[
                styles.unfreezeText,
                { color: frozen ? '#A90808' : '#fff' },
              ]}
            >
              {frozen ? 'unfreeze' : 'freeze'}
            </Text>
          </View>
        </View>
      </View>

      {/* Bottom Circle with Touchable Buttons */}
      <View style={styles.bottomCircle}>
        <TouchableOpacity style={styles.scannerWrapper} onPress={() => console.log('Scanner pressed')}>
          <View style={styles.scannerCircle}>
            <MaterialCommunityIcons name="qrcode-scan" size={35} color="#fff" />
          </View>
          <Text style={styles.scannerLabel}>yolo pay</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.homeWrapper} onPress={() => console.log('Home pressed')}>
          <View style={styles.homeIconCircle}>
            <Ionicons name="home-outline" size={35} color="#fff" />
          </View>
          <Text style={styles.homeText}>home</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.ginieWrapper} onPress={() => console.log('Ginie pressed')}>
          <View style={styles.ginieIconCircle}>
            <MaterialCommunityIcons name="sale" size={35} color="#fff" />
          </View>
          <Text style={styles.ginieText}>ginie</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  content: { paddingHorizontal: 16, paddingTop: 64 },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#fff',
    marginBottom: 8,
    fontFamily: 'Poppins',
  },
  subtitle: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.5,
    marginBottom: 36,
    fontFamily: 'Poppins',
  },
  buttonRow: { flexDirection: 'row', gap: 12, marginBottom: 24 },
  payButton: {
    width: 100,
    height: 40,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#fff',
    borderWidth: 1,
    borderTopWidth: 1.1,
    borderBottomWidth: 0,
    borderStartWidth: 0.2,
    borderEndWidth: 0.2,
  },
  payText: { color: '#fff', fontSize: 16, fontWeight: '800' },
  cardButton: {
    width: 100,
    height: 40,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#A90808',
    borderWidth: 1,
    borderTopWidth: 1.1,
    borderBottomWidth: 0,
    borderStartWidth: 0.2,
    borderEndWidth: 0.2,
  },
  cardText: { color: '#A90808', fontSize: 16, fontWeight: '800' },
  cardLabel: {
    fontSize: 12,
    color: '#fff',
    opacity: 0.2,
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  cardRow: { flexDirection: 'row', alignItems: 'center' },
  cardImageWrapper: { width: 220, height: 320, borderRadius: 16 },
  cardImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 16,
  },
  cardBlurWrapper: {
    width: 220,
    height: 320,
    borderRadius: 24,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  cardImageGenerated: {
    width: 220,
    height: 320,
    borderRadius: 20,
    backgroundColor: '#000000',
    padding: 16,
    justifyContent: 'space-between',
    position: 'relative',
  },
  unfrozenBorder: {
    borderWidth: 2,
    borderColor: '#ffffff88',
    borderRadius: 20,
    borderTopWidth: 0.2,
    borderBottomWidth: 0.2,
    borderStartWidth: 0.2,
    borderEndWidth: 0.2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  yoloImage: {
    width: 60,
    height: 20,
  },
  bankLogo: {
    width: 100,
    height: 40,
  },
  cardNumbers: { marginTop: 10 },
  numberLine: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '600',
    fontFamily: 'monospace',
    marginBottom: 6,
  },
  expiryCvvRow: {
    position: 'absolute',
    bottom: 130,
    right: 40,
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  label: { color: '#aaa', fontSize: 18, marginBottom: 1 },
  value: { color: '#fff', fontSize: 22 },
  lastCVVStar: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '800',
  },
  cvvRow: { flexDirection: 'row', alignItems: 'center' },
  copyRow: { flexDirection: 'row', alignItems: 'center' },
  copyText: {
    marginLeft: 4,
    fontSize: 12,
    color: 'red',
  },
  rupayLogo: {
    width: 100,
    height: 50,
    alignSelf: 'flex-end',
  },
  unfreezeSection: {
    marginLeft: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleIcon: {
    width: 58,
    height: 58,
    borderRadius: 70,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
     borderTopWidth: 0.4,
    borderBottomWidth: 0,
    borderStartWidth: 0.02,
    borderEndWidth: 0.02,
    
  },
  unfreezeText: {
    marginTop: 8,
    fontSize: 12,
    fontWeight: '500',
  },
  bottomCircle: {
    position: 'absolute',
    bottom: -250,
    alignSelf: 'center',
    width: 800,
    height: 400,
    borderTopLeftRadius: 700,
    borderTopRightRadius: 700,
    backgroundColor: 'transparent',
    borderColor: '#FFFFFF',
    borderWidth: 2,
    borderTopWidth: 2.8,
    borderBottomWidth: 10,
    borderStartWidth: 5,
    borderEndWidth: 5,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 35,
  },
  scannerWrapper: { alignItems: 'center' },
  scannerCircle: {
    width: 90,
    height: 90,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -20,
     borderTopWidth: 1.1,
    borderBottomWidth: 0,
    borderStartWidth: 0.2,
    borderEndWidth: 0.2,
  },
  scannerLabel: {
    marginTop: 10,
    fontSize: 16,
    color: '#fff',
  },
  homeWrapper: {
    position: 'absolute',
    top: 50,
    left: 260,
    alignItems: 'center',
  },
  homeIconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.3,
     borderTopWidth: 1.1,
    borderBottomWidth: 0,
    borderStartWidth: 0.2,
    borderEndWidth: 0.2,
  },
  homeText: {
    marginTop: 12,
    fontSize: 12,
    color: '#fff',
    opacity: 0.5,
  },
  ginieWrapper: {
    position: 'absolute',
    top: 50,
    right: 260,
    alignItems: 'center',
  },
  ginieIconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.3,
     borderTopWidth: 1.1,
    borderBottomWidth: 0,
    borderStartWidth: 0.2,
    borderEndWidth: 0.2,
  },
  ginieText: {
    marginTop: 12,
    fontSize: 12,
    color: '#fff',
    opacity: 0.5,
  },
});
