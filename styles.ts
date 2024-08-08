// styles.ts
import { StyleSheet } from 'react-native';

const colors = {
  primary: '#1E90FF',
  background: '#F0F0F0',
  card: '#FFFFFF',
  text: '#333333',
  accent: '#FF6347',
  error: '#FF0000',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: colors.card,
    padding: 20,
    margin: 10,
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    color: colors.text,
  },
  button: {
    backgroundColor: colors.accent,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
  },
  errorText: {
    fontSize: 16,
    color: colors.error,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
export { colors };
